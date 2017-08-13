import config from '../config';

const setCurrency = (currency) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_CURRENCY',
      currency
    });

    dispatch(fetchData());
  }
}

const setData = (data) => {
  return {
    type: 'SET_DATA',
    data
  }
}


const setDataLoading = (value) => {
  return {
    type: 'SET_DATA_LOADING',
    value
  }
}


const fetchData = () => {
  return (dispatch, getState) => {
    const {currency} = getState();

    dispatch(setDataLoading(true));
    fetch(`${config.api_base}ticker/?convert=${currency}`).then(res => res.json()).then((data) => {
      dispatch(setData(data));
      dispatch(fetchHistory());
    }).catch(err => {
      dispatch(setDataLoading(false));
    })
  }
}

const setHistoryLoading = (value) => {
  return {
    type: 'SET_HISTORY_LOADING',
    value
  }
}

const setHistory = (data) => {
  return {
    type: 'SET_HISTORY',
    data
  }
}

const fetchHistory = () => {
  return (dispatch, getState) => {
    const { currency, coins } = getState();
    dispatch(setHistoryLoading(true));
    if(coins && coins.length) {
      fetch(`${config.api_base}previous?coins=${coins.map((c) => c.id).join(',')}&convert=${currency}`).then(res => res.json()).then((data) => {
        dispatch(setHistory(data));
      }).catch((err) => {
        dispatch(setHistoryLoading(false));
      });
    }
  }
}

const addCoin = (coin, amount) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_COIN',
      coin,
      amount
    });
    dispatch(fetchHistory());
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

/* Export */
const exportData = () => {
  return (dispatch, getState) => {
    const { coins, watchlist, currency } = getState();
    const data = { coins, watchlist, currency };

    dispatch(setExportLoading(true));

    let body = new URLSearchParams();
    body.append('data', JSON.stringify(data));

    fetch(`${config.api_base}sync`, { method: 'POST', body }).then(res => res.json()).then((data) => {
      dispatch(setExportCode(data.code));
      dispatch(setExportLoading(false));
    }).catch((err) => {
      dispatch(setExportError(err));
      dispatch(setExportLoading(false));
    })


  }
}

const setExportLoading = (value) => {
  return {
    type: 'SET_EXPORT_LOADING',
    value
  }
}

const setExportError = (value) => {
  return {
    type: 'SET_EXPORT_ERROR',
    value
  }
}

const setExportCode = (value) => {
  return {
    type: 'SET_EXPORT_CODE',
    value
  }
}

/* Import */
const importData = (code) => {
  return (dispatch, getState) => {
    dispatch(setImportLoading(true));


    fetch(`${config.api_base}sync/${code}`).then(res => res.json()).then((data) => {
      console.log(data);
      dispatch(setImportLoading(false));
      dispatch(setImportSuccess(true));
    }).catch((err) => {
      dispatch(setImportError(err));
      dispatch(setImportLoading(false));
      dispatch(setImportSuccess(false));

    })


  }
}

const setImportLoading = (value) => {
  return {
    type: 'SET_IMPORT_LOADING',
    value
  }
}

const setImportSuccess = (value) => {
  return {
    type: 'SET_IMPORT_SUCCESS',
    value
  }
}

const setImportError = (value) => {
  return {
    type: 'SET_IMPORT_ERROR',
    value
  }
}

export { setCurrency, fetchData, addCoin, changeCoinAmount, removeCoin, addToWatchList, removeFromWatchList, importData, setScanning, setPage, fetchHistory, exportData };
