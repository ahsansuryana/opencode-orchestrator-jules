import { expect, test } from 'vitest';
import { hello } from '../src/index';

test('trivial test', () => {
  expect(hello).toBe('world');
});
