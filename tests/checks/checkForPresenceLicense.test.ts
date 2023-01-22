import test from 'ava';

import { createNewYardstick } from '../../src/domain/Yardstick';

test('It should pass when finding a LICENSE file', (t) => {
  const expected = 'pass';

  const yardstick = createNewYardstick({
    basePath: './testdata',
    checks: ['checkForPresenceLicense']
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should warn when missing a LICENSE file', (t) => {
  const expected = 'warn';

  const yardstick = createNewYardstick({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceLicense', severity: 'warn' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when missing a LICENSE file', (t) => {
  const expected = 'fail';

  const yardstick = createNewYardstick({
    basePath: './tests',
    checks: [{ name: 'checkForPresenceLicense', severity: 'error' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
