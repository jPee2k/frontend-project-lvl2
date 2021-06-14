import * as path from 'path';
import { readFileSync } from 'fs';
import compareData from '../src/core.js';

const pathToFiles = path.resolve(process.cwd(), '__tests__/__fixtures__');
const correctResultPath = path.resolve(pathToFiles, 'result/nested.txt');
const fileJson = path.resolve(pathToFiles, 'json/file1.json');
const fileYaml = path.resolve(pathToFiles, 'yaml/file2.yaml');

test('compare files', () => {
  const result = readFileSync(correctResultPath, 'utf-8');
  expect(compareData(fileJson, fileYaml)).toEqual(result);
});
