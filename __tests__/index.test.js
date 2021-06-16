import * as path from 'path';
import { readFileSync } from 'fs';
import compareData from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__tests__/__fixtures__', filename);
const getResult = (filename) => {
  const resultPath = getFixturePath(filename);
  return readFileSync(resultPath, 'utf-8');
};

let fileJson1; let fileJson2; let fileYaml1; let fileYaml2;

beforeAll(() => {
  fileJson1 = getFixturePath('file1.json');
  fileJson2 = getFixturePath('file2.json');
  fileYaml1 = getFixturePath('file1.yaml');
  fileYaml2 = getFixturePath('file2.yaml');
});

test('gendiff Stylish', () => {
  const result = getResult('stylish.txt');

  expect(compareData(fileJson1, fileJson2)).toEqual(result);
  expect(compareData(fileJson1, fileYaml2, 'stylish')).toEqual(result);
  expect(compareData(fileYaml1, fileYaml2, 'plain')).not.toEqual(result);
});

test('gendiff Plain', () => {
  const result = getResult('plain.txt');

  expect(compareData(fileYaml1, fileJson2, 'plain')).toEqual(result);
  expect(compareData(fileJson1, fileYaml2, 'plain')).toEqual(result);
});

test('gendiff Json', () => {
  expect(compareData(fileJson1, fileYaml2, 'json')).toEqual(getResult('json.txt'));
});

export default getFixturePath;
