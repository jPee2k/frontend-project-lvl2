import * as fs from 'fs';
import path from 'path';

export default JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'));
