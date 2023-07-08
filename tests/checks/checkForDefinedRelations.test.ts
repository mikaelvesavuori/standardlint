import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding at least one defined relation', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: './testdata',
    checks: ['checkForDefinedRelations']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn when finding no defined relations', (t) => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForDefinedRelations', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when finding no defined relations', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForDefinedRelations', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
