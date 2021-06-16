import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const chooseFormatter = (format) => {
  let generateResult;

  switch (format) {
    case 'plain':
      generateResult = makePlain;
      break;
    case 'json':
      generateResult = makeJson;
      break;
    default:
      generateResult = makeStylish;
  }

  return generateResult;
};

export default chooseFormatter;
