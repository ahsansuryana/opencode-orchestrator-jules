import { expect, test } from 'vitest';
import { logger } from '../src/index';

test('logger exists', () => {
  expect(logger).toBeDefined();
});
