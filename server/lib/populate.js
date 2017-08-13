const request = require("request-promise");
const promiseSeries = require("promise.series");
const cheerio = require("cheerio");
const moment = require("moment");


const getExchangeRates = (ExchangeRates) => {
  return new Promise((resolve, reject) => {
    request('https://coinmarketcap.com').then((html) => {
      const $ = cheerio.load(html);
      const rates = $('#currency-exchange-rates');
      for(let currency in rates.data()) {
        const amount = rates.data(currency);
        ExchangeRates.findOneAndUpdate({ currency }, { currency, amount }, { upsert: true }, (err, res) => {
          //console.log(err, res);
        });
      }
      resolve();
    }).catch(reject);
  })
}

const getAllCoins = () => {
  return new Promise((resolve, reject) => {
    request("https://api.coinmarketcap.com/v1/ticker/")
      .then(JSON.parse)
      .then(json => {
        resolve(json.map(r => r.id));
      })
      .catch(e => reject(e));
  });
};

const fetchHistory = (id, CoinHistory, idx, total) => {
  return new Promise((resolve, reject) => {
    console.log(`Fetching ${id} [${idx}/${total}]`);

    CoinHistory.find({ coin: id, live: { $ne: true }, date: { $gt: new moment().subtract(2, 'days')}}).then((rows) => {

      if(rows.length === 0) {
        console.log(`${id} is not up to date - fetching new info`);

        request(
          `https://coinmarketcap.com/currencies/${id}/historical-data/?start=20130428&end=${new moment().format('YYYYMMDD')}`
        ).then(data => {
          parseHistory(data, id)
            .then(rows => {
              console.log(`Got ${rows.length} entries`);
              rows.forEach((row) => {
                const { coin, date, price } = row;
                CoinHistory.findOneAndUpdate({ coin, date: new moment(date).startOf('day'), live: false }, { coin, date: new moment(date).startOf('day'), price, live: false }, { upsert: true }, (err, res) => {
                  //console.log(err, res);
                });
              })


              setTimeout(() => {
                resolve(id);
              }, 600);
            })
            .catch(resolve);
        });
      } else {
        console.log(`${id} is up to date`);
        resolve(id);
      }

    })



  });
};

const parseHistory = (html, id) => {
  return new Promise((resolve, reject) => {
    try {
      const data = [];
      const $ = cheerio.load(html);
      const rows = $("#historical-data tbody > tr");
      rows.each(function() {
        const date = new Date($($("td", this)[0]).text());
        const high = parseFloat($($("td", this)[2]).text());
        const low = parseFloat($($("td", this)[3]).text());
        const price = (high+low)/2;
        data.push({ coin: id, date, price });
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const getCoins = (CoinHistory) => {
  return new Promise((resolve, reject) => {
    getAllCoins().then(ids => {
      const promises = [];
      ids.forEach((id, k) => promises.push(() => fetchHistory(id, CoinHistory, k+1, ids.length)));
      promiseSeries(promises).then(() => {
        resolve();
      });
    }).catch(reject);
  })
}

const getLiveCoins = (CoinHistory) => {
  return new Promise((resolve, reject) => {
    request("https://api.coinmarketcap.com/v1/ticker/")
      .then(JSON.parse)
      .then(json => {
        json.forEach((coin) => {
          const date = new moment().startOf('hour');
          const price = coin.price_usd;

          console.log(`[${coin.id}] ${price} USD`);

          CoinHistory.findOneAndUpdate({ coin: coin.id, date, live: true }, { coin: coin.id, date, price }, { upsert: true }, (err, res) => {
            //console.log(err, res);
          });
          resolve(true);
        })

      })
      .catch(e => reject(e));
  });
};

const cleanLiveCoins = (CoinHistory) => {
    console.log('Cleaning live coins');
    CoinHistory.remove({ live: true });
    CoinHistory.remove({ live: true, date: { $lte: new moment().subtract(2, 'days').toDate() }});
}

const cleanSync = (Sync) => {
  console.log('Removing stale sync sessions');
  Sync.remove({ expires:  { $lte: new Date() }}).then(() => {
  }).catch((err) => {
  });
}


module.exports = { getExchangeRates, getCoins, getLiveCoins, cleanLiveCoins, cleanSync };
