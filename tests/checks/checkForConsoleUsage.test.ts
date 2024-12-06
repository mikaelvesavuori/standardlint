import { expect, test } from 'vitest';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when not finding any console usage while using base path', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: 'tests',
    checks: ['checkForConsoleUsage']
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should pass when not finding any console usage while using check-only path', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: 'tests',
    checks: [{ name: 'checkForConsoleUsage', path: 'tests' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should pass when not finding any console usage while using ignore paths', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    ignorePaths: ['/src/'],
    checks: ['checkForConsoleUsage']
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn when finding console.log()', () => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: 'testdata',
    checks: [{ name: 'checkForConsoleUsage', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should error when finding console.log()', () => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: 'testdata',
    checks: [{ name: 'checkForConsoleUsage', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should error when finding console.warn()', () => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: 'testdata',
    checks: [{ name: 'checkForConsoleUsage', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should error when finding console.error()', () => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: 'testdata',
    checks: [{ name: 'checkForConsoleUsage', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});
