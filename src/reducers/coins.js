import compact from 'lodash/compact';
import sortBy from 'lodash/sortBy';

const coins = (state = [], action) => {
  let clone = state.slice();

  switch (action.type) {
    case 'ADD_COIN':
      let found = false;
      clone.forEach((coin, k) => {
        if(coin && coin.id === action.coin) {
          found = true;
          clone[k].amount += action.amount;
        }
      });
      if(!found) {
        clone.push({ id: action.coin, amount: action.amount });
      }
      return sortBy(clone, 'id');
    case 'CHANGE_COIN_AMOUNT':
      clone.forEach((coin, k) => {
        if(coin && coin.id === action.coin) {
          found = true;
          clone[k].amount = action.amount;
        }
      });
      return sortBy(clone, 'id');
    case 'REMOVE_COIN':
      clone.forEach((coin, k) => {
        if(coin && coin.id === action.coin) {
          delete clone[k];
        }
      });
    return compact(clone);
    case 'IMPORT_COINS':
      clone = [];
      for(let id in action.coins) {
        clone.push({ id, amount: action.coins[id] })
      }
      return sortBy(clone, 'id');
    default:
      return state;
  }
};

export default coins;
