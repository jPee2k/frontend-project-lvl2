import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const chooseFormatter = (format) => {
  switch (format) {
    case 'plain':
      return makePlain;
    case 'json':
      return makeJson;
    default:
      return makeStylish;
  }
};

export default chooseFormatter;
