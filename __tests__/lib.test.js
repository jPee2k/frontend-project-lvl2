import path from 'path';
import { getFileData } from '../src/lib.js';

let pathToFiles;

beforeAll(() => {
  pathToFiles = path.resolve(process.cwd(), '__tests__/__fixtures__');
});

describe('-----> open & read the contents of JSON files', () => {
  let filepathToJson1;
  let filepathToJson2;

  beforeAll(() => {
    filepathToJson1 = path.resolve(pathToFiles, 'json/file1.json');
    filepathToJson2 = path.resolve(pathToFiles, 'json/file2.json');
  });

  test('reed data from files', () => {
    const actual1 = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };
    expect(getFileData(filepathToJson1)).toEqual(actual1);

    const actual2 = {
      timeout: 20,
      verbose: true,
      host: 'hexlet.io',
    };
    expect(actual2).toEqual(getFileData(filepathToJson2));

    expect(actual2).not.toEqual(getFileData(filepathToJson1));
    expect({}).toEqual(getFileData(pathToFiles));
  });
});
