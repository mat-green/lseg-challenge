'use strict';

class Parser {
  constructor(data) {
    this.data = data;
  }

  execute() {
    const temp = this.data.split(',');
    this.result = {
      time: temp[0].trim(),
      description: temp[1].trim(),
      type: temp[2].trim(),
      pid: temp[3].trim()
    };
  }

  getResult() {
    return this.result;
  }
}

module.exports = Parser;
