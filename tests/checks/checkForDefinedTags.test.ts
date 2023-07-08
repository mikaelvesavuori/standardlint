import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding at least one defined tag', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: './testdata',
    checks: ['checkForDefinedTags']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn when finding no defined tags', (t) => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForDefinedTags', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when finding no defined tags', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForDefinedTags', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
