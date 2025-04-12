'use strict';

class Enrichment {
  constructor(input, result = {}) {
    this.input = input;
    this.result = result;
  }

  execute() {
    // Identify each job or task and track its start and finish times.
    const now = new Date(); // Assume today as the data has only a time.
    this.pid = this.input['pid']
    if(undefined == this.result['description']) {
      this.result['description'] = this.input['description'];
    }
    const datetime = `${now.getFullYear()}-${('0'+(now.getMonth()+1)).substring(-2)}-${now.getDate()}T${this.input['time']}Z`;
    if('START' == this.input['type'].toUpperCase()) {
      this.result['start'] = new Date(datetime);
    }
    if('END' == this.input['type'].toUpperCase()) {
      this.result['end'] = new Date(datetime);
      // Calculate the duration of each job from the time it started to the time it finished.
      if(this.result['start']) {
        this.result['duration'] = this.result['end'].getTime() - this.result['start'].getTime()
      }
    }
  }

  getResult() {
    return [this.pid, this.result];
  }
}

module.exports = Enrichment;
