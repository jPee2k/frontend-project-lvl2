import * as path from 'path';
import { readFileSync } from 'fs';
import compareData from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__tests__/__fixtures__', filename);
const getResult = (filename) => {
  const resultPath = getFixturePath(filename);
  return readFileSync(resultPath, 'utf-8');
};

const files = {};

beforeAll(() => {
  files.json1 = getFixturePath('file1.json');
  files.json2 = getFixturePath('file2.json');
  files.yaml1 = getFixturePath('file1.yaml');
  files.yaml2 = getFixturePath('file2.yaml');
});

test('gendiff Stylish', () => {
  const result = getResult('stylish.txt');

  expect(compareData(files.json1, files.json2)).toEqual(result);
  expect(compareData(files.json1, files.yaml2, 'stylish')).toEqual(result);
  expect(compareData(files.yaml1, files.yaml2, 'plain')).not.toEqual(result);
});

test('gendiff Plain', () => {
  const result = getResult('plain.txt');

  expect(compareData(files.yaml1, files.json2, 'plain')).toEqual(result);
  expect(compareData(files.json1, files.yaml2, 'plain')).toEqual(result);
});

test('gendiff Json', () => {
  expect(compareData(files.json1, files.yaml2, 'json')).toEqual(getResult('json.txt'));
});

export default getFixturePath;
