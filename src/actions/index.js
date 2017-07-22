const setCurrency = (currency) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_CURRENCY',
      currency
    });

    dispatch(fetchData(currency));
  }
}

const setData = (data) => {
  return {
    type: 'SET_DATA',
    data
  }
}

const fetchData = (currency='USD') => {
  return (dispatch) => {
    fetch(`https://api.coinmarketcap.com/v1/ticker/?convert=${currency}`).then(res => res.json()).then((data) => {
      dispatch(setData(data));
    }).catch(err => console.log(err))
  }
}

const addCoin = (coin, amount) => {
  return {
    type: 'ADD_COIN',
    coin,
    amount
  }
}

const removeCoin = (coin) => {
  return {
    type: 'REMOVE_COIN',
    coin,
  }
}

const changeCoinAmount = (coin, amount) => {
  return {
    type: 'CHANGE_COIN_AMOUNT',
    coin,
    amount
  }
}

const addToWatchList = (coin) => {
  return {
    type: 'ADD_TO_WATCHLIST',
    coin,
  }
}

const removeFromWatchList = (coin) => {
  return {
    type: 'REMOVE_FROM_WATCHLIST',
    coin
  }
}

const importData = (data) => {
  return {
    type: 'IMPORT',
    data
  }
}

const setScanning = (scanning) => {
  return {
    type: 'SET_SCANNING',
    scanning
  }
}

const setPage = (page) => {
  return {
    type: 'SET_PAGE',
    page
  }
}

export { setCurrency, fetchData, addCoin, changeCoinAmount, removeCoin, addToWatchList, removeFromWatchList, importData, setScanning, setPage };
