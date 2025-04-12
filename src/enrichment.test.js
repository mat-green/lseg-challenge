const Enrichment = require('./enrichment.js');

test('with start data', () => {
  const input = {
    time: '11:51:06',
    description: 'scheduled task 626',
    type: 'START',
    pid: '32674'
  };
  const command = new Enrichment(input);
  command.execute()
  const [pid, result] = command.getResult();

  const now = new Date();
  expect(pid).toBe(input['pid']);
  expect(result['description']).toBe(input['description']);
  expect(result['start'].getTime()).toBe(new Date(`${now.getFullYear()}-${('0'+(now.getMonth()+1)).substring(-2)}-${now.getDate()}T${input['time']}Z`).getTime());
  expect(result['end']).toBeUndefined();
});

test('with start and end data', () => {
  const input1 = {
    time: '11:51:06',
    description: 'scheduled task 626',
    type: 'START',
    pid: '32674'
  };
  const command1 = new Enrichment(input1);
  command1.execute()
  const [pid1, result1] = command1.getResult();

  const input2 = {
    time: '11:55:36',
    description: 'scheduled task 626',
    type: 'END',
    pid: '32674'
  };
  const command2 = new Enrichment(input2, result1);
  command2.execute()
  const [pid2, result2] = command2.getResult();

  const now = new Date();
  expect(pid2).toBe(input2['pid']);
  expect(result2['description']).toBe(input1['description']);
  expect(result2['start'].getTime()).toBe(new Date(`${now.getFullYear()}-${('0'+(now.getMonth()+1)).substring(-2)}-${now.getDate()}T${input1['time']}Z`).getTime());
  expect(result2['end'].getTime()).toBe(new Date(`${now.getFullYear()}-${('0'+(now.getMonth()+1)).substring(-2)}-${now.getDate()}T${input2['time']}Z`).getTime());
});