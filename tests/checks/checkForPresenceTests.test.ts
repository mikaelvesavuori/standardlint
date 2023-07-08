import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding a test', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: '',
    checks: ['checkForPresenceTests']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
