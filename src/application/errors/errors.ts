/**
 * @description TODO
 */
export class MissingChecksError extends Error {
  constructor() {
    super();
    this.name = 'MissingChecksError';
    const message = `Missing checks!`;
    this.message = message;
  }
}
