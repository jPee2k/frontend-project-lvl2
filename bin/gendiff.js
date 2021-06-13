#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import compareData from '../src/core.js';
import info from '../src/info.js';

const program = new Command();

program
  .version(info.version, '-V, --version', 'output the version number')
  .description(info.description)
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(compareData(filepath1, filepath2));
  });

program.parse();
