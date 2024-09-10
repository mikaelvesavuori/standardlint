import { test, expect } from 'vitest';
import fs from 'fs';

import { createNewStandardLint } from '../../src/domain/StandardLint';
import { MissingChecksError } from '../../src/application/errors/errors';

test('It should check the provided checks', () => {
  const standardlint = createNewStandardLint({
    checks: ['checkForPresenceContributing']
  });
  standardlint.check();

  expect(true).toBe(true);
});

test('It should check the provided checks and output the results to a JSON file', () => {
  const standardlint = createNewStandardLint({
    checks: ['checkForPresenceContributing']
  });
  standardlint.check(true);

  const result = fs.existsSync(`${process.cwd()}/standardlint.results.json`);

  expect(result).toBe(true);
});

test('It should set the base path if the provided directory path exists', () => {
  const expected = 'tests';

  const standardlint = createNewStandardLint({ basePath: expected });
  const result = standardlint.config.basePath;

  expect(result).toBe(expected);
});

test('It should set the base path to the fallback value if the directory does not exist', () => {
  const expected = '.';

  const standardlint = createNewStandardLint({ basePath: 'jah3khg378fgag3f3a3' });
  const result = standardlint.config.basePath;

  expect(result).toBe(expected);
});

test('It should set the default severity if the value is valid', () => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({ defaultSeverity: expected });
  const result = standardlint.config.defaultSeverity;

  expect(result).toBe(expected);
});

test('It should set the default severity to the fallback value if provided value is invalid', () => {
  const expected = 'error';

  // @ts-ignore
  const standardlint = createNewStandardLint({ defaultSeverity: 'asdf' });
  const result = standardlint.config.defaultSeverity;

  expect(result).toBe(expected);
});

test('It should use a fallback severity value if an invalid severity value is encountered', () => {
  const expected = [
    {
      path: '',
      ignorePaths: [],
      name: 'checkForPresenceContributing',
      severity: 'error'
    }
  ];

  const standardlint = createNewStandardLint({
    // @ts-ignore
    checks: [{ name: 'checkForPresenceContributing', severity: 'asdf' }]
  });
  const result = standardlint.config.checks;

  expect(result).toMatchObject(expected);
});

test('It should validate a single valid check', () => {
  const expected = [
    {
      ignorePaths: [],
      name: 'checkForPresenceContributing',
      severity: 'error'
    }
  ];

  const standardlint = createNewStandardLint({
    checks: ['checkForPresenceContributing']
  });
  const result = standardlint.config.checks;

  expect(result).toMatchObject(expected);
});

test('It should remove checks with unknown names', () => {
  const expected = [
    {
      ignorePaths: [],
      name: 'checkForPresenceContributing',
      severity: 'error'
    }
  ];

  const standardlint = createNewStandardLint({
    checks: ['checkForPresenceContributing', 'something-that-does-not-exist']
  });
  const result = standardlint.config.checks;

  expect(result).toMatchObject(expected);
});

test('It should remove ignore paths that are not strings', () => {
  const expected = [
    {
      ignorePaths: ['abc'],
      name: 'checkForPresenceContributing',
      severity: 'error'
    }
  ];

  const standardlint = createNewStandardLint({
    // @ts-ignore
    ignorePaths: ['abc', 123],
    checks: ['checkForPresenceContributing']
  });
  const result = standardlint.config.checks;

  expect(result).toMatchObject(expected);
});

test('It should return an empty array for zero-length ignore paths', () => {
  const expected = [
    {
      ignorePaths: [],
      name: 'checkForPresenceContributing',
      severity: 'error'
    }
  ];

  const standardlint = createNewStandardLint({
    ignorePaths: [],
    checks: ['checkForPresenceContributing']
  });
  const result = standardlint.config.checks;

  expect(result).toMatchObject(expected);
});

test('It should validate a mixed set of string and object-defined checks', () => {
  const expected = [
    {
      ignorePaths: [],
      name: 'checkForPresenceContributing',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceLicense',
      path: '',
      severity: 'warn'
    }
  ];

  const standardlint = createNewStandardLint({
    checks: [
      'checkForPresenceContributing',
      {
        ignorePaths: [],
        name: 'checkForPresenceLicense',
        severity: 'warn'
      }
    ]
  });
  const result = standardlint.config.checks;

  expect(result).toMatchObject(expected);
});

test('It should use all checks if provided the "all" check option', () => {
  const expected = [
    {
      ignorePaths: [],
      name: 'checkForConflictingLockfiles',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForConsoleUsage',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForDefinedRelations',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForDefinedServiceLevelObjectives',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForDefinedTags',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceApiSchema',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceChangelog',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceCiConfig',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceCodeowners',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceContributing',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceDiagramsFolder',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceIacConfig',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceLicense',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceReadme',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceSecurity',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceServiceMetadata',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceTemplateIssues',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceTemplatePullRequests',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForPresenceTests',
      severity: 'error'
    },
    {
      ignorePaths: [],
      name: 'checkForThrowingPlainErrors',
      severity: 'error'
    }
  ];

  const standardlint = createNewStandardLint({
    checks: ['all']
  });
  const result = standardlint.config.checks;

  expect(result).toMatchObject(expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should throw a MissingChecksError if no checks are requested', () => {
  const standardlint = createNewStandardLint({ checks: [] });

  expect(() => standardlint.check()).toThrowError(MissingChecksError);
});
