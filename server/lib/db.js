const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URI  || process.env.MONGOHQ_URL || 'mongodb://localhost/coinhistory', {
      useMongoClient: true,
    }).then((db) => {
      const CoinHistory = db.model('CoinHistory', { coin: String, date: Date, price: Number, live: Boolean });
      const ExchangeRates = db.model('ExchangeRates', { currency: String, amount: Number });
      const Sync = db.model('Sync', { data: String, expires: Date, code: String });
      const Profile = db.model('Profile', { userId: String, data: Object });
      resolve({CoinHistory, ExchangeRates, Sync, Profile});
    });

  });
}

module.exports = db;
