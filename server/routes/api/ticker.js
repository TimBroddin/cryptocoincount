const request = require("request-promise");

const ticker = cache => (req, res) => {
  const { convert } = req.query;

  cache.get(`ticker-${convert}`, (err, value) => {
    if (value) {
      res.send(value);
    } else {
      request
        .get(
          `https://api.coinmarketcap.com/v1/ticker/?limit=10000&convert=${convert
            ? convert.toUpperCase()
            : ""}`
        )
        .then(json => {
          cache.set(`ticker-${convert}`, json);
          res.send(json);
        });
    }
  });
};

module.exports = { ticker };
