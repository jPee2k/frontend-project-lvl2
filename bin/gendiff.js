#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import { info } from '../src/lib.js';
import compareData from '../src/core.js';

const program = new Command();

program
  .version(info.version, '-V, --version', 'output the version number')
  .description(info.description)
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, type) => {
    console.log(compareData(filepath1, filepath2, type));
  });

program.parse();
