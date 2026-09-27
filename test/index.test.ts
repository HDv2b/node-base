import assert from 'node:assert/strict';
import { test } from 'node:test';
import { greet } from '../src/index.ts';

test('greet() returns a friendly greeting', () => {
  assert.equal(greet('World'), 'Hello, World!');
});
