import * as path from 'path';
import { readFileSync } from 'fs';
import compareData from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__tests__/__fixtures__', filename);

let fileJson1; let fileJson2; let fileYaml1; let fileYaml2;

beforeAll(() => {
  fileJson1 = getFixturePath('file1.json');
  fileJson2 = getFixturePath('file2.json');
  fileYaml1 = getFixturePath('file1.yaml');
  fileYaml2 = getFixturePath('file2.yaml');
});

test('gendiff Stylish', () => {
  const correctResultPath1 = getFixturePath('stylish.txt');
  const result1 = readFileSync(correctResultPath1, 'utf-8');

  expect(compareData(fileJson1, fileJson2, { format: 'stylish' })).toEqual(result1);
  expect(compareData(fileYaml1, fileYaml2, { format: 'stylish' })).toEqual(result1);
});

test('gendiff Plain', () => {
  const correctResultPath2 = getFixturePath('plain.txt');
  const result2 = readFileSync(correctResultPath2, 'utf-8');

  expect(compareData(fileYaml1, fileJson2, { format: 'plain' })).toEqual(result2);
  expect(compareData(fileJson1, fileYaml2, { format: 'plain' })).toEqual(result2);
});

test('gendiff Json', () => {
  const correctResultPath3 = getFixturePath('json.txt');
  const result3 = readFileSync(correctResultPath3, 'utf-8');

  expect(compareData(fileJson1, fileYaml2, { format: 'json' })).toEqual(result3);
});

export default getFixturePath;
