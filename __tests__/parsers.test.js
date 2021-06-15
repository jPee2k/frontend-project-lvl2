import path from 'path';
import yaml from 'js-yaml';
import { getCurrentParser, parseContent } from '../src/parsers.js';
import { getFileContent } from '../src/lib.js';

const pathToFiles = path.resolve(process.cwd(), '__tests__/__fixtures__');
const filepathToJson = path.resolve(pathToFiles, 'json/file1.json');
const filepathToYaml = path.resolve(pathToFiles, 'yaml/file2.yaml');
const filepathToTxt = path.resolve(pathToFiles, 'result/stylish.txt');

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
