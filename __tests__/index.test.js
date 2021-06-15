import * as path from 'path';
import { readFileSync } from 'fs';
import compareData from '../src/index.js';

let pathToFiles;
let fileJson1;
let fileJson2;
let fileYaml1;
let fileYaml2;

beforeAll(() => {
  pathToFiles = path.resolve(process.cwd(), '__tests__/__fixtures__');
  fileJson1 = path.resolve(pathToFiles, 'json/file1.json');
  fileJson2 = path.resolve(pathToFiles, 'json/file2.json');
  fileYaml1 = path.resolve(pathToFiles, 'yaml/file1.yaml');
  fileYaml2 = path.resolve(pathToFiles, 'yaml/file2.yaml');
});

test('compare files --format stylish', () => {
  const correctResultPath1 = path.resolve(pathToFiles, 'result/stylish.txt');
  const result1 = readFileSync(correctResultPath1, 'utf-8');
  expect(compareData(fileJson1, fileYaml2, { format: 'stylish' })).toEqual(result1);
});

test('compare files --format plain', () => {
  const correctResultPath2 = path.resolve(pathToFiles, 'result/plain.txt');
  const result2 = readFileSync(correctResultPath2, 'utf-8');
  expect(compareData(fileYaml1, fileJson2, { format: 'plain' })).toEqual(result2);
});
