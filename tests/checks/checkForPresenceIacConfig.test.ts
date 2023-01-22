import test from 'ava';

import { createNewYardstick } from '../../src/domain/Yardstick';

test('It should pass when finding an Infrastructure-as-Code configuration', (t) => {
  const expected = 'pass';

  const yardstick = createNewYardstick({
    basePath: './testdata',
    checks: ['checkForPresenceIacConfig']
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should warn when missing an Infrastructure-as-Code configuration', (t) => {
  const expected = 'warn';

  const yardstick = createNewYardstick({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceIacConfig', severity: 'warn' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when missing an Infrastructure-as-Code configuration', (t) => {
  const expected = 'fail';

  const yardstick = createNewYardstick({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceIacConfig', severity: 'error' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
