import { combineReducers } from 'redux';
import currency from './currency';
import coins from './coins';
import data from './data';
import history from './history';
import sync from './sync';
import navigation from './navigation';
import watchlist from './watchlist';
import exportReducer from './export';
import importReducer from './import';


const reducers = combineReducers({ currency, coins, watchlist, data, history, sync, navigation, export: exportReducer, import: importReducer });

export default reducers;
