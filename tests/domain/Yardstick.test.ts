import test from 'ava';

import { createNewYardstick } from '../../src/domain/Yardstick';

test('It should set the base path if the provided directory path exists', (t) => {
  const expected = 'tests';

  const yardstick = createNewYardstick({ basePath: expected });
  const result = yardstick.config.basePath;

  t.deepEqual(result, expected);
});

test('It should set the base path to the fallback value if the directory does not exist', (t) => {
  const expected = '.';

  const yardstick = createNewYardstick({ basePath: 'jah3khg378fgag3f3a3' });
  const result = yardstick.config.basePath;

  t.deepEqual(result, expected);
});

test('It should set the default severity if the value is valid', (t) => {
  const expected = 'warn';

  const yardstick = createNewYardstick({ defaultSeverity: expected });
  const result = yardstick.config.defaultSeverity;

  t.deepEqual(result, expected);
});

test('It should set the default severity to the fallback value if provided value is invalid', (t) => {
  const expected = 'error';

  // @ts-ignore
  const yardstick = createNewYardstick({ defaultSeverity: 'asdf' });
  const result = yardstick.config.defaultSeverity;

  t.deepEqual(result, expected);
});

test('It should use a fallback severity value if an invalid severity value is encountered', (t) => {
  const expected = [
    {
      name: 'checkForPresenceContributing',
      severity: 'error'
    }
  ];

  const yardstick = createNewYardstick({
    // @ts-ignore
    checks: [{ name: 'checkForPresenceContributing', severity: 'asdf' }]
  });
  const result = yardstick.config.checks;

  t.deepEqual(result, expected);
});

test('It should validate a single valid check', (t) => {
  const expected = [
    {
      name: 'checkForPresenceContributing',
      severity: 'error'
    }
  ];

  const yardstick = createNewYardstick({
    checks: ['checkForPresenceContributing']
  });
  const result = yardstick.config.checks;

  t.deepEqual(result, expected);
});

test('It should remove checks with unknown names', (t) => {
  const expected = [
    {
      name: 'checkForPresenceContributing',
      severity: 'error'
    }
  ];

  const yardstick = createNewYardstick({
    checks: ['checkForPresenceContributing', 'something-that-does-not-exist']
  });
  const result = yardstick.config.checks;

  t.deepEqual(result, expected);
});

test('It should validate a mixed set of string and object-defined checks', (t) => {
  const expected = [
    {
      name: 'checkForPresenceContributing',
      severity: 'error'
    },
    {
      name: 'checkForPresenceLicense',
      severity: 'warn'
    }
  ];

  const yardstick = createNewYardstick({
    checks: [
      'checkForPresenceContributing',
      {
        name: 'checkForPresenceLicense',
        severity: 'warn'
      }
    ]
  });
  const result = yardstick.config.checks;

  t.deepEqual(result, expected);
});

test('It should use all checks if provided the "all" check option', (t) => {
  const expected = [
    {
      name: 'checkForConflictingLockfiles',
      severity: 'error'
    },
    {
      name: 'checkForDefinedRelations',
      severity: 'error'
    },
    {
      name: 'checkForDefinedServiceLevelObjectives',
      severity: 'error'
    },
    {
      name: 'checkForDefinedTags',
      severity: 'error'
    },
    {
      name: 'checkForPresenceApiSchema',
      severity: 'error'
    },
    {
      name: 'checkForPresenceChangelog',
      severity: 'error'
    },
    {
      name: 'checkForPresenceCiConfig',
      severity: 'error'
    },
    {
      name: 'checkForPresenceCodeowners',
      severity: 'error'
    },
    {
      name: 'checkForPresenceContributing',
      severity: 'error'
    },
    {
      name: 'checkForPresenceDiagramsFolder',
      severity: 'error'
    },
    {
      name: 'checkForPresenceIacConfig',
      severity: 'error'
    },
    {
      name: 'checkForPresenceLicense',
      severity: 'error'
    },
    {
      name: 'checkForPresenceReadme',
      severity: 'error'
    },
    {
      name: 'checkForPresenceSecurity',
      severity: 'error'
    },
    {
      name: 'checkForPresenceServiceMetadata',
      severity: 'error'
    },
    {
      name: 'checkForPresenceTemplateIssues',
      severity: 'error'
    },
    {
      name: 'checkForPresenceTemplatePullRequests',
      severity: 'error'
    }
  ];

  const yardstick = createNewYardstick({
    checks: ['all']
  });
  const result = yardstick.config.checks;

  t.deepEqual(result, expected);
});

/**
 * NEGATIVE TESTS
 */

test('It should throw a MissingChecksError if no checks are requested', (t) => {
  const expected = 'MissingChecksError';

  const yardstick = createNewYardstick({ checks: [] });

  const error: any = t.throws(() => yardstick.check());

  t.is(error.name, expected);
});
