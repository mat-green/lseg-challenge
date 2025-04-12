#!/usr/bin/env node

'use strict';

const { Command } = require('commander');

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
    // Identify each job or task and track its start and finish times.
    // Calculate the duration of each job from the time it started to the time it finished.
    // Analyse data.
    console.debug("hello world")
  });
program.parse(process.argv);
