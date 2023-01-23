import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when there are no conflicting lock files', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: ['checkForConflictingLockfiles']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should warn when there are conflicting lock files', (t) => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: './testdata',
    checks: [{ name: 'checkForConflictingLockfiles', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when there are conflicting lock files', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: './testdata',
    checks: [{ name: 'checkForConflictingLockfiles', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
