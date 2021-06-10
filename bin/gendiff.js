#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import { compareData, printResult } from '../src/lib.js';

const program = new Command();

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const data = compareData(filepath1, filepath2);
    printResult(data);
  });

program.parse();
