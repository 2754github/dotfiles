/* eslint-disable no-restricted-syntax */

// https://www.wantedly.com/companies/wantedly/post_articles/492456
export class CustomError extends Error {
  static {
    this.prototype.name = 'CustomError';
  }

  // https://github.com/vercel/next.js/discussions/49506#discussioncomment-10120012
  digest: string;

  constructor(message: string, options: ErrorOptions) {
    super(message, options);
    this.name = 'CustomError';
    this.digest = message;
  }
}
