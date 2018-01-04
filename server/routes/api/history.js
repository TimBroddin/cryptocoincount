const moment = require("moment");
const findWhere = require("lodash.findwhere");

const history = ({ ExchangeRates, CoinHistory }, cache) => (req, res) => {
  const { coins, convert } = req.query;
  let output = {};

  if (!coins || !coins.length || !coins.split(",").length) {
    res.sendStatus(404);
    //res.send('');
    return;
  }

  cache.get(`history-${coins}-${convert}`, (err, value) => {
    if (value) {
      res.send(value);
    } else {
      ExchangeRates.findOne({
        currency: convert ? convert.toLowerCase() : "usd"
      }).then(currency => {
        if (!currency) {
          res.sendStatus(404);
          return;
        }

        CoinHistory.find({ coin: { $in: coins.split(",") } })
          .sort({ date: 1 })
          .then(rows => {
            rows.forEach(row => {
              const { coin, date, price } = row;
              if (!output[coin]) {
                output[coin] = [];
              }

              output[coin].push({ date, price: price / currency.amount });
            });
            cache.set(`history-${coins}-${convert}`, output, 60, err => {
              res.send(output);
            });
          })
          .catch(err => {
            res.sendStatus(500);
            return;
          });
      });
    }
  });
};

const daily = ({ ExchangeRates, CoinHistory }, cache) => (req, res) => {
  let { coins, convert, limit } = req.query;
  let output = {};

  console.log(req.query);

  if (!coins || !coins.length || !coins.split(",").length) {
    res.sendStatus(404);
    //res.send('');
    return;
  }

  if (!limit) {
    limit = 31;
  }

  cache.get(`daily-${coins}-${convert}-${limit}`, (err, value) => {
    if (value) {
      res.send(value);
    } else {
      ExchangeRates.findOne({
        currency: convert ? convert.toLowerCase() : "usd"
      }).then(currency => {
        if (!currency) {
          res.sendStatus(404);
          return;
        }

        let limitDate = new moment()
          .subtract(parseInt(limit, 10), "day")
          .startOf("day")
          .toDate();

        CoinHistory.find(
          { coin: { $in: coins.split(",") }, date: { $gte: limitDate } },
          null,
          { sort: { date: 1 } }
        )
          .sort({ date: 1 })
          .then(rows => {
            let last = {};
            rows.forEach((row, k) => {
              const { coin, date, price } = row;
              if (!output[coin]) {
                output[coin] = [];
              }
              let normalizedDate = new moment(date).startOf("day").toDate();
              if (
                !findWhere(output[coin], { date: normalizedDate }) &&
                !new moment(date)
                  .startOf("day")
                  .isSame(new moment().startOf("day"))
              ) {
                output[coin].push({
                  date: normalizedDate,
                  price: price / currency.amount
                });
              } else if (
                new moment(date)
                  .startOf("day")
                  .isSame(new moment().startOf("day"))
              ) {
                console.log("match");
                if (!last[coin]) last[coin] = {};
                last[coin] = {
                  date: normalizedDate,
                  price: price / currency.amount
                };
              } else {
                console.log(
                  normalizedDate,
                  new moment().startOf("day").toDate()
                );
              }
            });
            console.log(last);
            for (let coin in output) {
              if (last[coin]) {
                console.log("push last");
                output[coin].push(last[coin]);
              }
            }

            cache.set(`daily-${coins}-${convert}-${limit}`, output, 60, err => {
              res.send(output);
            });
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500);
            return;
          });
      });
    }
  });
};

const previous = ({ ExchangeRates, CoinHistory }, cache) => (req, res) => {
  const { coins, convert } = req.query;

  if (!coins || !coins.length || !coins.split(",").length) {
    res.sendStatus(404);
    return;
  }

  cache.get(`previous-${coins}-${convert}`, (err, value) => {
    if (value) {
      res.send(value);
    } else {
      ExchangeRates.findOne({
        currency: convert ? convert.toLowerCase() : "usd"
      }).then(currency => {
        if (!currency) {
          res.sendStatus(404);
          return;
        }

        let coinStr = coins.split(",");
        let promises = [];

        const searchPromise = coin => {
          return new Promise((resolve, reject) => {
            CoinHistory.find({ coin })
              .sort({ date: -1 })
              .limit(2)
              .then(rows => {
                if (rows.length === 2) {
                  resolve({
                    coin,
                    price: rows[1].price / currency.amount,
                    date: rows[1].date
                  });
                } else {
                  resolve({});
                }
              })
              .catch(reject);
          });
        };

        coinStr.forEach(coin => {
          promises.push(searchPromise(coin));
        });

        Promise.all(promises).then(values => {
          let json = {};
          values.forEach(
            v => (json[v.coin] = { price: v.price, date: v.date })
          );
          cache.set(`previous-${coins}-${convert}`, json, 60, err => {
            res.send(json);
          });
          return;
        });
      });
    }
  });
};

module.exports = { history, previous, daily };
