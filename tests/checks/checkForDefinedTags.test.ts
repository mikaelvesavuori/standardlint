import test from 'ava';

import { createNewYardstick } from '../../src/domain/Yardstick';

test('It should pass when finding at least one defined tag', (t) => {
  const expected = 'pass';

  const yardstick = createNewYardstick({
    basePath: './testdata',
    checks: ['checkForDefinedTags']
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should warn when finding no defined tags', (t) => {
  const expected = 'warn';

  const yardstick = createNewYardstick({
    basePath: './tests',
    checks: [{ name: 'checkForDefinedTags', severity: 'warn' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});

test('It should error when finding no defined tags', (t) => {
  const expected = 'fail';

  const yardstick = createNewYardstick({
    basePath: './tests',
    checks: [{ name: 'checkForDefinedTags', severity: 'error' }]
  });
  const result = yardstick.check().results?.[0]?.status;

  t.deepEqual(result, expected);
});
