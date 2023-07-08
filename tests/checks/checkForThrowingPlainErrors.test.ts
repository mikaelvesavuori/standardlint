import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when not finding any plain errors being thrown', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should pass when not finding any plain errors being thrown, while using ignore paths', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    ignorePaths: ['/src/'],
    checks: ['checkForThrowingPlainErrors']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn if it finds a plain error being thrown', (t) => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    checks: [{ name: 'checkForThrowingPlainErrors', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error if it finds a plain error being thrown', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    checks: [{ name: 'checkForThrowingPlainErrors', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
