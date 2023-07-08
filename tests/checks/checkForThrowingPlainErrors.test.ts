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

/**
 * NEGATIVE TESTS
 */

test('It should fail if it finds a plain error being thrown', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    checks: ['checkForThrowingPlainErrors']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
