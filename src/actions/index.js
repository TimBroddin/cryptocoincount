import { setCurrency } from './currency';
import { fetchData } from './data';
import { fetchHistory } from './history';
import { addCoin, changeCoinAmount, removeCoin } from './coinlist';
import { addToWatchList, removeFromWatchList } from './watchlist';
import { importData, exportData } from './sync';
import { setPage } from './navigation';
import { loadUserData, saveUserData } from './cloud';

export {
  setCurrency,
  fetchData,
  addCoin,
  changeCoinAmount,
  removeCoin,
  addToWatchList,
  removeFromWatchList,
  importData,
  setPage,
  fetchHistory,
  exportData,
  loadUserData,
  saveUserData
};
