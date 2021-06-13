import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import { parseContent } from './parsers.js';

export const getFileContent = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);

  try {
    const resource = fs.readFileSync(fullPath, 'utf8');
    return resource.toString();
  } catch (error) {
    console.log(error);
  }

  return '';
};

export const getData = (filepath) => parseContent(filepath, getFileContent(filepath));

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

export const getEditedData = (data1, data2, flag = 'rm') => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  let prefix = '';
  let data = {};
  let keyDifferences = [];

  switch (flag) {
    case 'rm':
      prefix = '-';
      data = data1;
      keyDifferences = _.difference(keys1, keys2);
      break;
    case 'add':
      prefix = '+';
      keyDifferences = _.difference(keys2, keys1);
      data = data2;
      break;
    default:
      prefix = ' ';
  }

  return keyDifferences
    .map((key) => ({ prefix, key, value: data[key] }));
};

export const generateResult = (coll) => {
  if (coll.length === 0) {
    return '';
  }
  const result = coll
    .map((item) => `${item.prefix} ${item.key}: ${item.value}`);

  const tab = '  ';
  const text = result.join(`\n${tab}`);

  return `\n{\n${tab}${text}\n}`;
};

export const calculateDiff = (data1, data2) => {
  if (_.isEqual(data1, data2) || _.isEmpty(data1) || _.isEmpty(data2)) {
    return [];
  }

  const listOfDifferences = [
    ...getIntersectionData(data1, data2),
    ...getEditedData(data1, data2, 'rm'),
    ...getEditedData(data1, data2, 'add'),
  ];

  return _.sortBy(listOfDifferences, (item) => item.key);
};
