const FileResource = require('./file_resource.js');

test('read file data', () => {
  const input = new FileResource('./fixtures/test.txt');
  const result = [];
  for (const line of input.get()) {
    result.push(line);
  }
  expect(result[0]).toBe("hello");
  expect(result[1]).toBe("world");
});