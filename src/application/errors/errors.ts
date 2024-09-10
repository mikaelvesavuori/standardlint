/**
 * @description Used when StandardLint is being run but no checks are defined.
 */
export class MissingChecksError extends Error {
  constructor() {
    super();
    this.name = 'MissingChecksError';
    const message = `Missing checks!`;
    this.message = message;
  }
}

/**
 * @description Used when StandardLint receives an invalid or zero-length filetree.
 */
export class InvalidFiletreeError extends Error {
  constructor() {
    super();
    this.name = 'InvalidFiletreeError';
    const message = `Invalid filetree provided: Must contain at least 1 string if a filetree is to be used.`;
    this.message = message;
  }
}
