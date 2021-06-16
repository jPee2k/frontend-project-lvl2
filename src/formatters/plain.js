import _ from 'lodash';

const hasChildren = (item) => _.isArray(item?.value);

const getTextByType = (item, key) => {
  if (_.isString(item[key])) {
    return `'${item[key]}'`;
  }
  if (_.isObject(item[key])) {
    return '[complex value]';
  }

  return item[key];
};

const getPath = (item, ancestor) => {
  if (ancestor === '') {
    return `${item.key}`;
  }
  return `${ancestor}.${item.key}`;
};

const makePlain = (data) => {
  const iter = (coll, ancestor = '') => coll
    .filter((item) => item.prefix !== ' ')
    .map((item) => {
      if (hasChildren(item)) {
        return iter(item.value, getPath(item, ancestor));
      }

      switch (item.prefix) {
        case '-':
          return `Property '${getPath(item, ancestor)}' was removed`;
        case '+':
          return `Property '${getPath(item, ancestor)}' was added with value: ${getTextByType(item, 'value')}`;
        case '!':
          return `Property '${getPath(item, ancestor)}' was updated. From ${getTextByType(item, 'removedValue')} to ${getTextByType(item, 'addedValue')}`;
        default:
          return '';
      }
    })
    .join('\n');
  return `${iter(data)}`;
};

export default makePlain;
