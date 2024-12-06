import { expect, test } from 'vitest';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding a CODEOWNERS file', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: './testdata',
    checks: ['checkForPresenceCodeowners']
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should pass when finding a CODEOWNERS file and using a CODEOWNERS file', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint(
    {
      basePath: './testdata',
      checks: ['checkForPresenceCodeowners']
    },
    ['testdata/CODEOWNERS']
  );
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn when missing a CODEOWNERS file', () => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceCodeowners', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should error when missing a CODEOWNERS file', () => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceCodeowners', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});
