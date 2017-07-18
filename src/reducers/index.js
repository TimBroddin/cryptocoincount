import { combineReducers } from 'redux';
import currency from './currency';
import coins from './coins';
import data from './data';

const reducers = combineReducers({ currency, coins, data });

export default reducers;
