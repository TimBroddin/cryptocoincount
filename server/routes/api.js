const express = require("express");
const router = express.Router();
const redis = require("redis");
const CachemanRedis = require("cacheman-redis");

const syncApi = require("./api/sync");
const historyApi = require("./api/history");
const tickerApi = require("./api/ticker");
const securedApi = require("./api/secured");

const redisClient = (client = redis.createClient(process.env.REDIS_URL));
const cache = new CachemanRedis(redisClient);

function api(collections) {
  const { CoinHistory, ExchangeRates, Sync } = collections;

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

  router.get(
    "/history/daily",
    historyApi.daily({ CoinHistory, ExchangeRates }, cache)
  );

  router.get(
    "/history",
    historyApi.history({ CoinHistory, ExchangeRates }, cache)
  );

  router.get(
    "/previous",
    historyApi.previous({ CoinHistory, ExchangeRates }, cache)
  );
  router.get("/ticker", tickerApi.ticker(cache));
  router.post("/sync", syncApi.syncPost(Sync));
  router.get("/sync/:code", syncApi.syncGet(Sync));

  router.use("/secure", securedApi(collections));

  return router;
}

module.exports = api;
