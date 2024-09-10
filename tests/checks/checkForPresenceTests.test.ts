import { test, expect } from 'vitest';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding a test using the base path', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    checks: ['checkForPresenceTests']
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should pass when finding a test using the check-only path', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: '',
    checks: [{ name: 'checkForPresenceTests', path: 'tests' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should pass when finding a test while using ignore paths', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    ignorePaths: ['/src/'],
    checks: ['checkForPresenceTests']
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn when not finding a test', () => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: 'testdata/diagrams',
    checks: [{ name: 'checkForPresenceTests', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should error when not finding a test', () => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: 'testdata/diagrams',
    checks: [{ name: 'checkForPresenceTests', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});
