import {
  getData, calculateDiff,
} from './lib.js';
import makeStylish from './formatters/stylish.js';

const compareData = (file1, file2, type) => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const diff = calculateDiff(data1, data2);

  // temp
  const makePlain = () => {};

  let generateResult;
  switch (type?.format) {
    case 'plain':
      generateResult = makePlain;
      break;
    default:
      generateResult = makeStylish;
  }

  return generateResult(diff);
};

export default compareData;
