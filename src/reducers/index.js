import { combineReducers } from 'redux';
import currency from './currency';
import coins from './coins';
import data from './data';
import sync from './sync';
import navigation from './navigation';
import watchlist from './watchlist';

const reducers = combineReducers({ currency, coins, watchlist, data, sync, navigation });

export default reducers;
