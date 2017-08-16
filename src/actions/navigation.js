import { SET_PAGE } from './constants';

const setPage = page => {
  return {
    type: SET_PAGE,
    page
  };
};

export { setPage }
