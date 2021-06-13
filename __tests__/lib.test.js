import {
  getIntersectionData, getEditedData, generateResult,
} from '../src/lib.js';

let jsonData1;
let jsonData2;

beforeAll(() => {
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
  expect(generateResult([])).toEqual('');
  expect(generateResult([{ prefix: '+', key: 'ab', value: 123 }, {
    prefix: '-',
    key: 'bb',
    value: 'zxc',
  }])).toEqual('\n{\n  + ab: 123\n  - bb: zxc\n}');
});
