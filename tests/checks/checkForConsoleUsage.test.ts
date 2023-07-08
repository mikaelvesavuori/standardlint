import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when not finding any console usage', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: 'tests',
    checks: ['checkForConsoleUsage']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

/**
 * NEGATIVE CASES
 */

test('It should fail when finding console.log()', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: 'testdata',
    checks: ['checkForConsoleUsage']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should fail when finding console.warn()', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: 'testdata',
    checks: ['checkForConsoleUsage']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should fail when finding console.error()', (t) => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: 'testdata',
    checks: ['checkForConsoleUsage']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
