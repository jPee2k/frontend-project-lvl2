import yaml from 'js-yaml';
import getFixturePath from './index.test.js';
import { getCurrentParser, parseContent } from '../src/parsers.js';
import { getFileContent } from '../src/lib.js';

let filepathToJson;
let filepathToYaml;
let filepathToTxt;

beforeAll(() => {
  filepathToJson = getFixturePath('file1.json');
  filepathToYaml = getFixturePath('file2.yaml');
  filepathToTxt = getFixturePath('stylish.txt');
});

let parser;

test('parser by ext', () => {
  parser = getCurrentParser(filepathToJson);
  expect(parser).toEqual(JSON.parse);
  expect(parser).not.toEqual(yaml.safeLoad);

  parser = getCurrentParser(filepathToYaml);
  expect(parser).toEqual(yaml.safeLoad);
});

test('parse data', () => {
  const content1 = getFileContent(filepathToJson);
  expect(parseContent(filepathToJson, content1)).toEqual(JSON.parse(content1));

  const content2 = getFileContent(filepathToYaml);
  expect(parseContent(filepathToYaml, content2)).toEqual(yaml.safeLoad(content2));

  const content3 = getFileContent(filepathToTxt);
  expect(parseContent(filepathToTxt, content3)).toEqual({});
});
