const Parser = require('./parser.js');

test('start data', () => {
  const parser = new Parser('11:40:51,scheduled task 996, START,90962');
  parser.execute();
  const result = parser.getResult();
  expect(result["description"]).toBe("scheduled task 996");
  expect(result["pid"]).toBe("90962");
  expect(result["time"]).toBe("11:40:51");
  expect(result["type"]).toBe("START");
});

test('end data', () => {
  const parser = new Parser('11:42:33,scheduled task 996, END,90962');
  parser.execute();
  const result = parser.getResult();
  expect(result["description"]).toBe("scheduled task 996");
  expect(result["pid"]).toBe("90962");
  expect(result["time"]).toBe("11:42:33");
  expect(result["type"]).toBe("END");
});
