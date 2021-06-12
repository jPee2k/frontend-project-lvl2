import path from 'path';
import yaml from 'js-yaml';

export const getCurrentParser = (filepath) => {
  const ext = path.extname(filepath);

  let parser;
  switch (ext) {
    case '.json':
      parser = JSON.parse;
      break;
    case '.yaml':
      parser = yaml.safeLoad;
      break;
    case '.yml':
      parser = yaml.safeLoad;
      break;
    default:
      parser = () => ({});
  }

  return parser;
};

export const parseContent = (filepath, content) => {
  const parse = getCurrentParser(filepath);

  try {
    return parse(content);
  } catch (error) {
    console.log(error);
  }

  return {};
};
