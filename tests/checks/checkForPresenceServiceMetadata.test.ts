import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding a service metadata file', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: './testdata',
    checks: ['checkForPresenceServiceMetadata']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn when missing a service metadata file', (t) => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceServiceMetadata', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when missing a service metadata file', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceServiceMetadata', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
