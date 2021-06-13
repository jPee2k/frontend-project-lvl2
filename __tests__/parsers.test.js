import path from 'path';
import yaml from 'js-yaml';
import { getCurrentParser, parseContent } from '../src/parsers.js';
import { getFileContent } from '../src/lib.js';

const pathToFiles = path.resolve(process.cwd(), '__tests__/__fixtures__');

const filepathToYml = path.resolve(pathToFiles, 'yaml/file3.yml');
const filepathToYaml = path.resolve(pathToFiles, 'yaml/file2.yaml');
const filepathToJson = path.resolve(pathToFiles, 'json/file1.json');

let jsonData;
let ymlData;

let parser;

beforeAll(() => {
  jsonData = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  ymlData = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
});

test('parser by ext', () => {
  parser = getCurrentParser(filepathToJson);
  expect(parser).toEqual(JSON.parse);
  expect(parser).not.toEqual(yaml.safeLoad);

  parser = getCurrentParser(filepathToYaml);
  expect(parser).toEqual(yaml.safeLoad);

  parser = getCurrentParser(filepathToYml);
  expect(parser).toEqual(yaml.safeLoad);
});

test('parse data', () => {
  const content1 = getFileContent(pathToFiles);
  expect(parseContent(pathToFiles, content1)).toEqual({});

  const content2 = getFileContent(filepathToYml);
  expect(parseContent(filepathToYml, content2)).toEqual(jsonData);

  const content3 = getFileContent(filepathToYaml);
  expect(parseContent(filepathToYaml, content3)).toEqual(ymlData);

  const content4 = getFileContent(filepathToJson);
  expect(parseContent(filepathToJson, content4)).toEqual(jsonData);
});
