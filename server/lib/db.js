const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/coinhistory', {
      useMongoClient: true,
    }).then((db) => {
      const CoinHistory = db.model('CoinHistory', { coin: String, date: Date, price: Number, live: Boolean });
      const ExchangeRates = db.model('ExchangeRates', { currency: String, amount: Number });
      resolve({CoinHistory, ExchangeRates});
    });

  });
}

module.exports = db;
