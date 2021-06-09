#!/usr/bin/env node
import {Command} from 'commander/esm.mjs';

const program = new Command();

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information');

program.parse();
