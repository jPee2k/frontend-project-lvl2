import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';
import { parseContent } from './parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const info = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));

export const getFileContent = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);

  try {
    const resource = fs.readFileSync(fullPath, 'utf8');
    return resource.toString();
  } catch (error) {
    console.log(error);
  }

  throw new Error('file missing');
};

export const getData = (filepath) => parseContent(filepath, getFileContent(filepath));

export const calculateDiff = (data1, data2) => {
  const unionKeys = _.union(Object.keys(data1), Object.keys(data2));
  const result = unionKeys.flatMap((key) => {
    if (!_.has(data1, key)) {
      return { prefix: '+', key, value: data2[key] };
    }

    if (!_.has(data2, key)) {
      return { prefix: '-', key, value: data1[key] };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        prefix: '*',
        key,
        value: calculateDiff(data1[key], data2[key]),
      };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        prefix: '!', key, removedValue: data1[key], addedValue: data2[key],
      };
    }

    return { prefix: ' ', key, value: data1[key] };
  });

  return _.sortBy(result, (item) => item.key);
};
