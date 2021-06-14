import path from 'path';
import yaml from 'js-yaml';

export const getCurrentParser = (filepath) => {
  const ext = path.extname(filepath);
  let parser;

  if (ext === '.json') {
    parser = JSON.parse;
  } else if (ext === '.yaml' || ext === '.yml') {
    parser = yaml.safeLoad;
  }

  return parser;
};

export const parseContent = (filepath, content) => {
  const parse = getCurrentParser(filepath);

  try {
    return parse ? parse(content) : {};
  } catch (error) {
    console.log(error);
  }

  throw new Error('parser crushed');
};