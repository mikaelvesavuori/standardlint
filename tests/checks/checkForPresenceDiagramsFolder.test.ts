import { expect, test } from 'vitest';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should pass when finding a folder with solution diagrams', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint({
    basePath: './testdata',
    checks: ['checkForPresenceDiagramsFolder']
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should pass when finding a folder with solution diagrams and using a filetree', () => {
  const expected = 'pass';

  const standardlint = createNewStandardLint(
    {
      basePath: './testdata',
      checks: ['checkForPresenceDiagramsFolder']
    },
    ['testdata/diagrams/demo.drawio']
  );
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should warn when missing a folder with solution diagrams', () => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceDiagramsFolder', severity: 'warn' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should error when missing a folder with solution diagrams', () => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceDiagramsFolder', severity: 'error' }]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});

test('It should error when using a non-existent directory', () => {
  const expected = 'fail';

  const standardlint = createNewStandardLint({
    basePath: './tests',
    checks: [
      {
        name: 'checkForPresenceDiagramsFolder',
        severity: 'error',
        path: 'jklah3f98y'
      }
    ]
  });
  const result = standardlint.check().results?.[0]?.status;

  expect(result).toBe(expected);
});
