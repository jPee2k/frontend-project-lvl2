import yaml from 'js-yaml';
import getFixturePath from './index.test.js';
import { getCurrentParser, parseContent } from '../src/parsers.js';
import { getFileContent } from '../src/lib.js';

const filepath = {};

beforeAll(() => {
  filepath.toJson = getFixturePath('file1.json');
  filepath.toYaml = getFixturePath('file2.yaml');
  filepath.toTxt = getFixturePath('stylish.txt');
});

test('parser by ext', () => {
  const parser1 = getCurrentParser(filepath.toJson);
  expect(parser1).toEqual(JSON.parse);
  expect(parser1).not.toEqual(yaml.safeLoad);

  const parser2 = getCurrentParser(filepath.toYaml);
  expect(parser2).toEqual(yaml.safeLoad);
});

test('parse data', () => {
  const content1 = getFileContent(filepath.toJson);
  expect(parseContent(filepath.toJson, content1)).toEqual(JSON.parse(content1));

  const content2 = getFileContent(filepath.toYaml);
  expect(parseContent(filepath.toYaml, content2)).toEqual(yaml.safeLoad(content2));

  const content3 = getFileContent(filepath.toTxt);
  try {
    parseContent(filepath.toTxt, content3);
  } catch (e) {
    expect(e.message).toBeTruthy();
  }
});
