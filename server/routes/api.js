const express = require("express");
const router = express.Router();
const NodeCache = require("node-cache");
const request = require("request-promise");
const randomString = require("randomstring");
const moment = require("moment");

const cache = new NodeCache({ stdTTL: 60, checkperiod: 60 });

function api({ CoinHistory, ExchangeRates, Sync }) {
  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  router.get("/history", (req, res) => {
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
              cache.set(`history-${coins}-${convert}`, output);
              res.send(output);
            })
            .catch(err => {
              res.sendStatus(500);
              return;
            });
        });
      }
    });
  });

  router.get("/previous", function(req, res) {
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
            cache.set(`previous-${coins}-${convert}`, json);
            res.send(json);
            return;
          });
        });
      }
    });
  });

  router.get("/ticker", (req, res) => {
    const { convert } = req.query;

    cache.get(`ticker-${convert}`, (err, value) => {
      if (value) {
        res.send(value);
      } else {
        request
          .get(
            `https://api.coinmarketcap.com/v1/ticker/?convert=${convert
              ? convert.toUpperCase()
              : ""}`
          )
          .then(json => {
            cache.set(`ticker-${convert}`, json);
            res.send(json);
          });
      }
    });
  });

  router.post("/sync", (req, res) => {
    const { data } = req.body;

    if(!typeof data === 'String' || !data) {
      res.sendStatus(500);
      return;
    }

    const code = randomString.generate({
      length: 6,
      charset: "alphabetic",
      capitalization: "uppercase"
    });
    const expires = new moment().add(2, 'minutes').toDate()

    const item = new Sync({ data, code, expires});

    item.save().then(() => {
      res.send({ code });
    }).catch((err) => {
      res.send(err);
    });
  });

  router.get('/sync/:code', (req, res) => {
    const { code } = req.params;

    Sync.findOne({ code }).then((row) => {
      res.send(row.data);
    }).catch(() => {
      res.sendStatus(404);
      return;
    })
  });

  return router;
}

module.exports = api;
