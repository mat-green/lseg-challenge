'use strict';

const fs = require('fs');

class FileResource {
  constructor(filepath) {
    const contents = fs.readFileSync(filepath, 'utf-8');
    this.lines = Array();
    contents.split(/\r?\n/).forEach(line =>  {
      if(line.length > 0) {
        this.lines.push(line);
      }
    });
  }

  * get() {
    let index = 0;
    while(index < this.lines.length)
    {
      yield this.lines[index];
      index++;
    };
  }
}

module.exports = FileResource;
