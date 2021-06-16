import chooseFormatter from '../../src/formatters/index.js';
import makeStylish from '../../src/formatters/stylish.js';
import makePlain from '../../src/formatters/plain.js';
import makeJson from '../../src/formatters/json.js';

test('choose formatter', () => {
  expect(chooseFormatter('')).toEqual(makeStylish);
  expect(chooseFormatter('stylish')).toEqual(makeStylish);
  expect(chooseFormatter('plain')).toEqual(makePlain);
  expect(chooseFormatter('json')).toEqual(makeJson);
});
