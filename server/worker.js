const db = require('./lib/db');
const { getExchangeRates, getCoins, getLiveCoins, cleanLiveCoins } = require('./lib/populate');

db().then(({ CoinHistory, ExchangeRates }) => {
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

  updateData();
  updateLive();

});
