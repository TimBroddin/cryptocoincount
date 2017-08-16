require('ignore-styles')
const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const db = require('./lib/db');
const api = require('./routes/api');

require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
})

const index = require('./routes/index');


// routes
//const index = require('./routes/index')
// const api = require('./routes/api')
const universalLoader = require('./universal')


const app = express()

// Support Gzip
app.use(compression())

// Support post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Setup logger
app.use(morgan('combined'))



// Serve static assets

db().then((collections) => {
  app.use('/', index);
  app.use('/index.html', index);
  app.use('/', express.static(path.resolve(__dirname, '..', 'build'), { maxAge: 0 }))
  app.use('/api', api(collections));
  app.use('/', universalLoader);
})


// Always return the main index.html, so react-router render the route in the client

module.exports = app
