import yaml from 'js-yaml';
import { getFixturePath, getFileContent } from '../src/lib.js';
import { getCurrentParser, parseContent } from '../src/parsers.js';

test('parser by ext', () => {
  const filepathToJson = getFixturePath('file1.json');
  const filepathToYaml = getFixturePath('file2.yaml');

  const parser1 = getCurrentParser(filepathToJson);
  expect(parser1).toEqual(JSON.parse);
  expect(parser1).not.toEqual(yaml.safeLoad);

  const parser2 = getCurrentParser(filepathToYaml);
  expect(parser2).toEqual(yaml.safeLoad);
});

test('parse data', () => {
  const filepathToJson = getFixturePath('file1.json');
  const filepathToYaml = getFixturePath('file2.yaml');
  const filepathToTxt = getFixturePath('stylish.txt');

  const content1 = getFileContent(filepathToJson);
  expect(parseContent(filepathToJson, content1)).toEqual(JSON.parse(content1));

  const content2 = getFileContent(filepathToYaml);
  expect(parseContent(filepathToYaml, content2)).toEqual(yaml.safeLoad(content2));

  const content3 = getFileContent(filepathToTxt);
  expect(() => parseContent(filepathToTxt, content3)).toThrow();
});
