import makeStylish from './stylish.js';
import makePlain from './plain.js';

const chooseFormatter = ({ format }) => {
  let generateResult;

  switch (format) {
    case 'plain':
      generateResult = makePlain;
      break;
    default:
      generateResult = makeStylish;
  }

  return generateResult;
};

export default chooseFormatter;
