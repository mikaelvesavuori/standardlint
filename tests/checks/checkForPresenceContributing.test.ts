import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding a CONTRIBUTING file', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: './testdata',
    checks: ['checkForPresenceContributing']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn when missing a CONTRIBUTING file', (t) => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceContributing', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when missing a CONTRIBUTING file', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceContributing', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
