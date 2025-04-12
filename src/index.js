#!/usr/bin/env node

'use strict';

const { Command } = require('commander');
const FileResource = require('./file_resource.js');
const Parser = require('./parser.js');

const pkg = require('../package.json');

const program = new Command();

program.version(pkg.version);
program
  .command('analyse')
  .argument('<filepath>', 'The path to file to be analyse.')
  .description('')
  .action(function (filepath) {
    // Parse the CSV log file.
    const input = new FileResource(filepath);
    for (const line of input.get()) {
      const parser = new Parser(line);
      parser.execute();
      const result = parser.getResult();
      console.debug(result);
    }
    // Identify each job or task and track its start and finish times.
    // Calculate the duration of each job from the time it started to the time it finished.
    // Analyse data.
  });
program.parse(process.argv);
