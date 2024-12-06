import { expect, test } from 'vitest';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding a GitHub Pull Request template', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: './testdata',
    checks: ['checkForPresenceTemplatePullRequests']
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should pass when finding a GitHub Pull Request template and using a filetree', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint(
    {
      basePath: './testdata',
      checks: ['checkForPresenceTemplatePullRequests']
    },
    ['testdata/.github/ISSUE_TEMPLATE/pull_request.md']
  );
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn when missing a GitHub Pull Request template', () => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceTemplatePullRequests', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should error when missing a GitHub Pull Request template', () => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [
      { name: 'checkForPresenceTemplatePullRequests', severity: 'error' }
    ]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});
