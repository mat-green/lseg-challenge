#!/usr/bin/env node

'use strict';

const { Command } = require('commander');
const Enrichment = require('./enrichment.js');
const FileResource = require('./file_resource.js');
const Parser = require('./parser.js');

const logger = require('./logger.js');
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

    // Analyse data and report long running processes.
    const fiveMinutes = 1000 * 60 * 5; // microsecond x seconds x minutes
    const tenMinutes = 1000 * 60 * 10;
    for (const key of Object.keys(result)) {
      if(result[key]['duration'] > tenMinutes) {
        logger.error(`${result[key]['description']} took longer than 10 minutes`)
      } else if(result[key]['duration'] > fiveMinutes) {
        logger.warn(`${result[key]['description']} took longer than 5 minutes`)
      }
    }
  });
program.parse(process.argv);
