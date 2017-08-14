const express = require("express");
const router = express.Router();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://cryptocoincount.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://cryptocoincount.com/api',
    issuer: "https://cryptocoincount.auth0.com/",
    algorithms: ['RS256']
});



function secured(collections) {
  const { Profile } = collections;

  router.use(jwtCheck);

  router.get('/load', (req, res) => {
    Profile.findOne({ userId: req.user.sub }).then((row) => {
      if(!row) {
        res.send(false);
      } else {
        res.send(row.data);
      }
    })
  });

  router.post('/save', (req, res) => {
    Profile.findOneAndUpdate({ userId: req.user.sub }, { userId: req.user.sub, data: JSON.parse(req.body.data) }, { upsert: true }, (err, r) => {
      res.send(true);
    });

  })


  return router;
}

module.exports = secured;
