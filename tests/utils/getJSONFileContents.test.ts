import { expect, test } from 'vitest';

import { getJSONFileContents } from '../../src/utils/getJSONFileContents';

test('It should get an empty object if reading a non-existent path', () => {
  const expected = {};

  const result = getJSONFileContents('d2k3ugd287td', 'aklj');

  expect(result).toMatchObject(expected);
});

test('It should get an empty object if trying to read a non-JSON file', () => {
  const expected = {};

  const result = getJSONFileContents('testdata', 'README.md');

  expect(result).toMatchObject(expected);
});
