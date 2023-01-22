import test from 'ava';

import { getJSONFileContents } from '../../src/utils/getJSONFileContents';

test('It should get an empty object if reading a non-existent path', (t) => {
  const expected = {};

  const result = getJSONFileContents('d2k3ugd287td', 'aklj');

  t.deepEqual(result, expected);
});

test('It should get an empty object if trying to read a non-JSON file', (t) => {
  const expected = {};

  const result = getJSONFileContents('testdata', 'README.md');

  t.deepEqual(result, expected);
});
