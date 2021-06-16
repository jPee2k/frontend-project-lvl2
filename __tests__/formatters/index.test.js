import chooseFormatter from '../../src/formatters/index.js';
import makeStylish from '../../src/formatters/stylish.js';
import makePlain from '../../src/formatters/plain.js';
import makeJson from '../../src/formatters/json.js';

test('choose formatter', () => {
  expect(chooseFormatter({})).toEqual(makeStylish);

  const stylish = { format: 'stylish' };
  expect(chooseFormatter(stylish)).toEqual(makeStylish);

  const plain = { format: 'plain' };
  expect(chooseFormatter(plain)).toEqual(makePlain);

  const json = { format: 'json' };
  expect(chooseFormatter(json)).toEqual(makeJson);
});
