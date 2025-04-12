#!/usr/bin/env node

'use strict';

const { Command } = require('commander');
const Enrichment = require('./enrichment.js');
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
    const result = {};
    for (const line of input.get()) {
      const parser = new Parser(line);
      parser.execute();
      const data = parser.getResult();
      if(undefined == result[data['pid']]) {
        const enricher = new Enrichment(data);
        enricher.execute()
        const [pid, record] = enricher.getResult();
        result[pid] = record;
      } else {
        const enricher = new Enrichment(data, result[data['pid']]);
        enricher.execute()
        const [pid, record] = enricher.getResult();
        result[pid] = record;
      }
    }
    console.debug(result);
    // Analyse data.
  });
program.parse(process.argv);
