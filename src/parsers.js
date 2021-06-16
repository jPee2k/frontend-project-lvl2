import path from 'path';
import yaml from 'js-yaml';

export const getCurrentParser = (filepath) => {
  const ext = path.extname(filepath);

  switch (ext) {
    case '.json':
      return JSON.parse;
    case '.yaml':
      return yaml.safeLoad;
    case '.yml':
      return yaml.safeLoad;
    default:
      throw new Error(`Unknown file extension: '${ext}'`);
  }
};

export const parseContent = (filepath, content) => {
  const parse = getCurrentParser(filepath);
  return parse ? parse(content) : {};
};
