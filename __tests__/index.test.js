import * as path from 'path';
import { readFileSync } from 'fs';
import compareData from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__tests__/__fixtures__', filename);

test('gendiff --format stylish', () => {
  const correctResultPath = getFixturePath('stylish.txt');
  const result = readFileSync(correctResultPath, 'utf-8');

  const fileJson = getFixturePath('file1.json');
  const fileYaml = getFixturePath('file2.yaml');
  expect(compareData(fileJson, fileYaml, { format: 'stylish' })).toEqual(result);
});

test('gendiff --format plain', () => {
  const correctResultPath = getFixturePath('plain.txt');
  const result = readFileSync(correctResultPath, 'utf-8');

  const fileYaml = getFixturePath('file1.yaml');
  const fileJson = getFixturePath('file2.json');
  expect(compareData(fileYaml, fileJson, { format: 'plain' })).toEqual(result);
});

test('gendiff --format json', () => {
  const correctResultPath = getFixturePath('json.txt');
  const result = readFileSync(correctResultPath, 'utf-8');
  console.log(result);

  const fileYaml1 = getFixturePath('file1.yaml');
  const fileYaml2 = getFixturePath('file2.yaml');
  expect(compareData(fileYaml1, fileYaml2, { format: 'json' })).toEqual(result);
});

export default getFixturePath;
