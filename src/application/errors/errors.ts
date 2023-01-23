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
