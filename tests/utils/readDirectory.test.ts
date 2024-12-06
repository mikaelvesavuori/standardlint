import { expect, test } from 'vitest';

import { readDirectory } from '../../src/utils/readDirectory';

test('It should get an empty array when using a non-existent path', () => {
  const expected: string[] = [];

  const result = readDirectory('d2k3ugd287td');

  expect(result).toMatchObject(expected);
});
