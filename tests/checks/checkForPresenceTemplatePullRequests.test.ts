import test from 'ava';

import { createNewYardstick } from '../../src/domain/Yardstick';

test('It should pass when finding a GitHub Pull Request template', (t) => {
  const expected = 'pass';

  const yardstick = createNewYardstick({
    basePath: './testdata',
    checks: ['checkForPresenceTemplatePullRequests']
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should warn when missing a GitHub Pull Request template', (t) => {
  const expected = 'warn';

  const yardstick = createNewYardstick({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceTemplatePullRequests', severity: 'warn' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when missing a GitHub Pull Request template', (t) => {
  const expected = 'fail';

  const yardstick = createNewYardstick({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceTemplatePullRequests', severity: 'error' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
