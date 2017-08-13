const db = require('./lib/db');
const { getExchangeRates, getCoins, getLiveCoins, cleanLiveCoins, cleanSync } = require('./lib/populate');

db().then(({ CoinHistory, ExchangeRates, Sync }) => {
  function updateData() {
    getExchangeRates(ExchangeRates).then(() => {
      console.log('Updated exchange rates');
    }).catch((err) => {
      console.log('Error updating exchange rates');
    });

    getCoins(CoinHistory).then(() => {
      console.log('Updated coins');
    }).catch((err) => {
      console.log('Error updating coins');
    });

    cleanLiveCoins(CoinHistory);

  }

  function updateLive() {
    getLiveCoins(CoinHistory).then(() => {
      console.log('Live coins updated');
    });
  }

  setInterval(() => {
    updateData();
  }, 1000*60*60*12);

  setInterval(() => {
    updateLive();
  }, 1000*60*30);

  setInterval(() => {
    cleanSync(Sync);
  }, 1000*30)

  updateData();
  updateLive();
  cleanSync(Sync);

});
