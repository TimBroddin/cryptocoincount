# CryptocoinCount

This is the source code for [CryptocoinCount.com](https://cryptocoincount.com). A
web application that allows you to track your cryptocoin assets.

## Features

- Live rates from Coinmarketcap.
- Works offline
- Everything is stored on your computer
- Ability to sync between devices by scanning a QR-code

## Technology

React, Redux, ServiceWorker, [LocalForage](https://github.com/localForage/localForage)

## Running it

`npm install yarn -g`
`yarn`
`yarn run build`
`yarn start`

## Backend

In order to populate the backend, make sure MongoDB is installed and run:

`yarn run worker`

OR:

You can change api_base in `/src/config.js` to `https://cryptocoincount.com/api/` and use the Cryptocoincount backend.

## Development

You can run in development mode (code reload, etc) by running:

`yarn run dev`

Make sure to change api_base to a running API.

## Donate

If you really like this project, you can donate some crypto to me:

- Bitcoin: 1Kw9yQLgJuz76sdXtQnVeEV1dBwForzNbM
- Ethereum: 0x4f46b7fDDc29A6BCAD07c73D98FBB101CaFAb58d
- Litecoin: LUyVHHoALwr2hznHTrmLRMXLVyUR28y1TJ
