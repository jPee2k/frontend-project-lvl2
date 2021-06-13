import * as path from 'path';
import { readFileSync } from 'fs';
import compareData from '../src/core.js';

const pathToFiles = path.resolve(process.cwd(), '__tests__/__fixtures__');

const filepathToJson1 = path.resolve(pathToFiles, 'json/file1.json');
const filepathToJson2 = path.resolve(pathToFiles, 'json/file2.json');
const filepathToJson3 = path.resolve(pathToFiles, 'json/file3.json');
const filepathToYaml = path.resolve(pathToFiles, 'yaml/file2.yaml');

const correctResultPath1 = path.resolve(pathToFiles, 'result/file1');
const correctResult1 = readFileSync(correctResultPath1, 'utf-8');

const correctResultPath2 = path.resolve(pathToFiles, 'result/file2');
const correctResult2 = readFileSync(correctResultPath2, 'utf-8');

test('compare files', () => {
  expect(compareData(filepathToJson1, 'cba')).toEqual('');
  expect(compareData(filepathToJson1, filepathToJson2)).toEqual(correctResult1);
  expect(compareData(filepathToYaml, filepathToJson3)).toEqual(correctResult2);
});
