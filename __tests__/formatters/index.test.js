import chooseFormatter from '../../src/formatters/index.js';
import makeStylish from '../../src/formatters/stylish.js';
import makePlain from '../../src/formatters/plain.js';

test('choose formatter', () => {
  const stylish = { format: 'stylish' };
  const plain = { format: 'plain' };

  expect(chooseFormatter({})).toEqual(makeStylish);
  expect(chooseFormatter(stylish)).toEqual(makeStylish);
  expect(chooseFormatter(plain)).toEqual(makePlain);
});
