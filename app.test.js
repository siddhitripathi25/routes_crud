const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('./app/index.js');

let server;

test.before(async () => {
  server = app.listen(0);
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

test('GET /api/items returns an array', async () => {
  const port = server.address().port;
  const response = await fetch(`http://127.0.0.1:${port}/api/items`);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.ok(Array.isArray(data));
});
