import _ from 'lodash';

const addTabs = (spaces) => {
  const tab = '    ';
  return (tab.repeat(spaces));
};

const generateResult = (items, spaces) => {
  const lines = items.join('\n');
  return `{\n${lines}\n${addTabs(spaces)}}`;
};

const makeLines = (value, spaces = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const items = _.keys(value)
    .map((key) => `${addTabs(spaces + 1)}${key}: ${makeLines(value[key], spaces + 1)}`);

  return generateResult(items, spaces);
};

const makeStylish = (data) => {
  if (data.length === 0) {
    return '';
  }

  const iter = (coll, spaces = 0) => {
    const items = coll.map((item) => {
      let result;

      if (item.prefix === '-' || item.prefix === '+' || item.prefix === ' ') {
        result = `${addTabs(spaces)}  ${item.prefix} ${item.key}: ${makeLines(item.value, spaces + 1)}`;
      } if (item.prefix === '!') {
        const removed = `${addTabs(spaces)}  - ${item.key}: ${makeLines(item.removedValue, spaces + 1)}`;
        const added = `${addTabs(spaces)}  + ${item.key}: ${makeLines(item.addedValue, spaces + 1)}`;
        result = `${removed}\n${added}`;
      } if (item.prefix === '*') {
        result = `${addTabs(spaces + 1)}${item.key}: ${iter(item.value, spaces + 1)}`;
      }

      return result;
    });

    return generateResult(items, spaces);
  };

  return `\n${iter(data)}`;
};

export default makeStylish;
