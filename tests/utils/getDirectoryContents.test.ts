import test from 'ava';

import { getDirectoryContents } from '../../src/utils/getDirectoryContents';

test('It should get an empty array when using a non-existent path', (t) => {
  const expected: string[] = [];

  const result = getDirectoryContents('d2k3ugd287td');

  t.deepEqual(result, expected);
});
