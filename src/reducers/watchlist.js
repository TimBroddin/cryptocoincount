import compact from 'lodash/compact';

const watchlist = (state = [], action) => {
  let clone = state.slice();

  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      if(clone.indexOf(action.coin) === -1) {
        clone.push(action.coin);
      }
      return clone;
    case 'REMOVE_FROM_WATCHLIST':
      const idx = clone.indexOf(action.coin);
      if(idx !== -1) {
        delete clone[idx];
      }
      return compact(clone);
    case 'IMPORT':
      clone = [];
      if(action.data && action.data.watchlist) {
        clone = action.data.watchlist;
      }
      return clone;
    default:
      return state;
  }
};

export default watchlist;
