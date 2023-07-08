import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding a test using the base path', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    checks: ['checkForPresenceTests']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should pass when finding a test using the check-only path', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: '',
    checks: [{ name: 'checkForPresenceTests', path: 'tests' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
