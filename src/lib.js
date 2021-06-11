import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export const getFileData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);

  try {
    const resource = fs.readFileSync(fullPath, 'utf8');
    const content = resource.toString();
    return JSON.parse(content);
  } catch (err) {
    console.log(err);
  }

  return {};
};

 export const getIntersectionData = (data1, data2) => {
  const keyIntersections = _.intersection(Object.keys(data1), Object.keys(data2));

  return keyIntersections.flatMap((key) => {
    if (_.isEqual(data1[key], data2[key])) {
      return { prefix: ' ', key, value: data1[key] };
    }

    return [
      { prefix: '-', key, value: data1[key] },
      { prefix: '+', key, value: data2[key] },
    ];
  });
};

export const getRemovedData = (data1, data2) => {
  const keyDifferences = _.difference(Object.keys(data1), Object.keys(data2));

  return keyDifferences
    .map((key) => ({ prefix: '-', key, value: data1[key] }));
};

export const getAddedData = (data1, data2) => {
  const keyDifferences = _.difference(Object.keys(data2), Object.keys(data1));

  return keyDifferences
    .map((key) => ({ prefix: '+', key, value: data2[key] }));
};

export const generateResult = (coll) => coll
  .map((item) => `${item?.prefix} ${item?.key}: ${item?.value}`);

export const printResult = (coll) => {
  if (coll.length === 0) {
    return;
  }

  const tab = '  ';
  const text = coll.join(`\n${tab}`);

  console.log(`\n{\n${tab}${text}\n}`);
};

export const compareData = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);

  if (_.isEqual(data1, data2) || _.isEmpty(data1) || _.isEmpty(data2)) {
    return [];
  }

  const listOfDifferences = [
    ...getIntersectionData(data1, data2),
    ...getRemovedData(data1, data2),
    ...getAddedData(data1, data2),
  ].sort((a, b) => a.key.localeCompare(b.key));

  return generateResult(listOfDifferences);
};
