import _ from 'lodash';

const hasChildren = (item) => _.isArray(item?.value);

const getTextByType = (item, key) => {
  if (_.isString(item[key])) {
    return `'${item[key]}'`;
  } if (_.isObject(item[key])) {
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
  if (data.length === 0) {
    return '';
  }

  const iter = (coll, ancestor = '') => {
    const items = coll
      .filter((item) => item.prefix !== ' ')
      .map((item) => {
        if (hasChildren(item)) {
          return iter(item.value, getPath(item, ancestor));
        }

        let result;
        switch (item.prefix) {
          case '-':
            result = `Property '${getPath(item, ancestor)}' was removed`;
            break;
          case '+':
            result = `Property '${getPath(item, ancestor)}' was added with value: ${getTextByType(item, 'value')}`;
            break;
          case '!':
            result = `Property '${getPath(item, ancestor)}' was updated. From ${getTextByType(item, 'removedValue')} to ${getTextByType(item, 'addedValue')}`;
            break;
          default:
            break;
        }
        return result;
      });
    return items.join('\n');
  };
  return `\n${iter(data)}`;
};

export default makePlain;
