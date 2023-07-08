import test from 'ava';
import fs from 'fs';

import { createNewStandardLint } from '../../src/domain/StandardLint';

test('It should check the provided checks', (t) => {
  const standardlint = createNewStandardLint({
    checks: ['checkForPresenceContributing']
  });
  standardlint.check();

  t.pass();
});

test('It should check the provided checks and output the results to a JSON file', (t) => {
  const standardlint = createNewStandardLint({
    checks: ['checkForPresenceContributing']
  });
  standardlint.check(true);

  const result = fs.existsSync(`${process.cwd()}/standardlint.results.json`);

  t.is(result, true);
});

test('It should set the base path if the provided directory path exists', (t) => {
  const expected = 'tests';

  const standardlint = createNewStandardLint({ basePath: expected });
  const result = standardlint.config.basePath;

  t.deepEqual(result, expected);
});

test('It should set the base path to the fallback value if the directory does not exist', (t) => {
  const expected = '.';

  const standardlint = createNewStandardLint({ basePath: 'jah3khg378fgag3f3a3' });
  const result = standardlint.config.basePath;

  t.deepEqual(result, expected);
});

test('It should set the default severity if the value is valid', (t) => {
  const expected = 'warn';

  const standardlint = createNewStandardLint({ defaultSeverity: expected });
  const result = standardlint.config.defaultSeverity;

  t.deepEqual(result, expected);
});

test('It should set the default severity to the fallback value if provided value is invalid', (t) => {
  const expected = 'error';

  // @ts-ignore
  const standardlint = createNewStandardLint({ defaultSeverity: 'asdf' });
  const result = standardlint.config.defaultSeverity;

  t.deepEqual(result, expected);
});

test('It should use a fallback severity value if an invalid severity value is encountered', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should validate a single valid check', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should remove checks with unknown names', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should validate a mixed set of string and object-defined checks', (t) => {
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

  t.deepEqual(result, expected);
});

test('It should use all checks if provided the "all" check option', (t) => {
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

  t.deepEqual(result, expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should throw a MissingChecksError if no checks are requested', (t) => {
  const expected = 'MissingChecksError';

  const standardlint = createNewStandardLint({ checks: [] });

  const error: any = t.throws(() => standardlint.check());

  t.is(error.name, expected);
});
