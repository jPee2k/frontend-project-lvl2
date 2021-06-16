import compareData from '../src/index.js';
import { getFixturePath, getResult } from '../src/lib.js';

test('gendiff Stylish', () => {
  const result = getResult('stylish.txt');

  const fileJson1 = getFixturePath('file1.json');
  const fileJson2 = getFixturePath('file2.json');
  expect(compareData(fileJson1, fileJson2)).toEqual(result);

  const fileYaml2 = getFixturePath('file2.yaml');
  expect(compareData(fileJson1, fileYaml2, 'stylish')).toEqual(result);

  const fileYaml1 = getFixturePath('file1.yaml');
  expect(compareData(fileYaml1, fileYaml2, 'plain')).not.toEqual(result);
});

test('gendiff Plain', () => {
  const result = getResult('plain.txt');

  const fileYaml1 = getFixturePath('file1.yaml');
  const fileJson2 = getFixturePath('file2.json');
  expect(compareData(fileYaml1, fileJson2, 'plain')).toEqual(result);

  const fileJson1 = getFixturePath('file1.json');
  const fileYaml2 = getFixturePath('file2.yaml');
  expect(compareData(fileJson1, fileYaml2, 'plain')).toEqual(result);
});

test('gendiff Json', () => {
  const fileJson1 = getFixturePath('file1.json');
  const fileYaml2 = getFixturePath('file2.yaml');
  expect(compareData(fileJson1, fileYaml2, 'json')).toEqual(getResult('json.txt'));
});
