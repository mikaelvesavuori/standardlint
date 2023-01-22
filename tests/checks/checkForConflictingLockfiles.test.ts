import test from 'ava';

import { createNewYardstick } from '../../src/domain/Yardstick';

test('It should pass when there are no conflicting lock files', (t) => {
  const expected = 'pass';

  const yardstick = createNewYardstick({
    basePath: './tests',
    checks: ['checkForConflictingLockfiles']
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should warn when there are conflicting lock files', (t) => {
  const expected = 'warn';

  const yardstick = createNewYardstick({
    basePath: './testdata',
    checks: [{ name: 'checkForConflictingLockfiles', severity: 'warn' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when there are conflicting lock files', (t) => {
  const expected = 'fail';

  const yardstick = createNewYardstick({
    basePath: './testdata',
    checks: [{ name: 'checkForConflictingLockfiles', severity: 'error' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
