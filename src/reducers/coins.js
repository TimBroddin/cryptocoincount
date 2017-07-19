import compact from 'lodash/compact';

const coins = (state = [], action) => {
  const clone = state.slice();

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
      return clone;
    case 'CHANGE_COIN_AMOUNT':
      clone.forEach((coin, k) => {
        if(coin && coin.id === action.coin) {
          found = true;
          clone[k].amount = action.amount;
        }
      });
      return clone;
    case 'REMOVE_COIN':
    clone.forEach((coin, k) => {
      if(coin && coin.id === action.coin) {
        delete clone[k];
      }
    });
    return compact(clone);
    default:
      return state;
  }
};

export default coins;
