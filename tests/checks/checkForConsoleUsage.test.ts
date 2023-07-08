import test from 'ava';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when not finding any console usage when using base path', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: 'tests',
    checks: ['checkForConsoleUsage']
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should pass when not finding any console usage when using check-only path', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: 'tests',
    checks: [{ name: 'checkForConsoleUsage', path: 'tests' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should pass and accept ignore paths', (t) => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: 'testdata',
    ignorePaths: ['/src/'],
    checks: [{ name: 'checkForConsoleUsage' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

/**
 * NEGATIVE TESTS
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
