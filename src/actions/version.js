import { BUMP_VERSION } from './constants';

const bumpVersion = () => {
  return {
    type: BUMP_VERSION
  }
}

export { bumpVersion };
