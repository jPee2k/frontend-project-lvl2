import {
  getData, calculateDiff, generateResult,
} from './lib.js';

const compareData = (file1, file2) => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const diff = calculateDiff(data1, data2);

  return generateResult(diff);
};

export default compareData;
