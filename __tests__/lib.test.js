import fs from 'fs';
import path from 'path';
import {
  getFileContent, getIntersectionData, getEditedData, generateResult, compareData,
} from '../src/lib.js';

let pathToFiles;

let filepathToJson1;
let filepathToJson2;
let filepathToJson3;

let jsonData1;
let jsonData2;

beforeAll(() => {
  pathToFiles = path.resolve(process.cwd(), '__tests__/__fixtures__');
  filepathToJson1 = path.resolve(pathToFiles, 'json/file1.json');
  filepathToJson2 = path.resolve(pathToFiles, 'json/file2.json');
  filepathToJson3 = path.resolve(pathToFiles, 'json/file3.json');

  jsonData1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  jsonData2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
});

test('check content', () => {
  expect(getFileContent(pathToFiles)).toEqual('');

  const data1 = fs.readFileSync(filepathToJson1, 'utf8').toString();
  expect(getFileContent(filepathToJson1)).toEqual(data1);

  const data2 = fs.readFileSync(filepathToJson2, 'utf8').toString();
  expect(getFileContent(filepathToJson2)).toEqual(data2);

  expect(getFileContent(filepathToJson2)).not.toEqual(data1);
});

test('intersections', () => {
  expect(getIntersectionData({ key: 'proxy' }, { value: '123.234.53.22' })).toEqual([]);
  expect(getIntersectionData(jsonData1, jsonData2)).toEqual([
    { prefix: ' ', key: 'host', value: 'hexlet.io' },
    { prefix: '-', key: 'timeout', value: 50 },
    { prefix: '+', key: 'timeout', value: 20 },
  ]);
});

test('differences', () => {
  expect(getEditedData({}, {})).toEqual([]);
  expect(getEditedData(jsonData1, jsonData2)).toEqual(getEditedData(jsonData1, jsonData2, 'rm'));
  expect(getEditedData(jsonData1, jsonData2)).toEqual([
    { prefix: '-', key: 'proxy', value: '123.234.53.22' },
    { prefix: '-', key: 'follow', value: false },
  ]);
  expect(getEditedData(jsonData1, jsonData2, 'add')).toEqual([
    { prefix: '+', key: 'verbose', value: true },
  ]);
});

test('result', () => {
  expect(generateResult([])).toEqual([]);
  expect(generateResult([{ prefix: '+', key: 'ab', value: 123 }, {
    prefix: '-',
    key: 'bb',
    value: 'zxc',
  }])).toEqual(['+ ab: 123', '- bb: zxc']);
});

test('compare files', () => {
  expect(compareData(filepathToJson2, 'cba')).toEqual([]);
  expect(compareData(filepathToJson1, filepathToJson2)).toEqual([
    '- follow: false',
    '  host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
    '+ timeout: 20',
    '+ verbose: true',
  ]);
  expect(compareData(filepathToJson2, filepathToJson1)).toEqual([
    '+ follow: false',
    '  host: hexlet.io',
    '+ proxy: 123.234.53.22',
    '- timeout: 20',
    '+ timeout: 50',
    '- verbose: true',
  ]);
  expect(compareData(filepathToJson2, filepathToJson3)).toEqual([
    '+ follow: false',
    '  host: hexlet.io',
    '+ proxy: 123.234.53.22',
    '- timeout: 20',
    '+ timeout: 1',
    '- verbose: true',
  ]);
});
