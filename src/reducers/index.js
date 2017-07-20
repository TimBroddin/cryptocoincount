import { combineReducers } from 'redux';
import currency from './currency';
import coins from './coins';
import data from './data';
import sync from './sync';

const reducers = combineReducers({ currency, coins, data, sync });

export default reducers;
