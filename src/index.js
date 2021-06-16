import { getData, calculateDiff } from './lib.js';
import chooseFormatter from './formatters/index.js';

const compareData = (file1, file2, type = 'stylish') => {
  const data1 = getData(file1);
  const data2 = getData(file2);
  const diff = calculateDiff(data1, data2);
  const generateResult = chooseFormatter(type);

  return generateResult(diff);
};

export default compareData;
