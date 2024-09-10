import { test, expect } from 'vitest';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when not finding any plain errors being thrown', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: '',
    checks: [
      {
        name: 'checkForThrowingPlainErrors',
        path: 'tests'
      }
    ]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should pass when not finding any plain errors being thrown, while using ignore paths', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    ignorePaths: ['/src/'],
    checks: ['checkForThrowingPlainErrors']
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn if it finds a plain error being thrown', () => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    checks: [{ name: 'checkForThrowingPlainErrors', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should error if it finds a plain error being thrown', () => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    checks: [{ name: 'checkForThrowingPlainErrors', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});
