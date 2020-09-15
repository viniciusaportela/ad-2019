export class HttpError extends Error {
  public code: number;
  public errorCode: string;
  public description?: string;

  constructor() {
    super();
    this.name = "HttpError";
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super();
    this.name = "NotFoundError";
    this.code = 404;
    this.errorCode = "not_found";
  }
}

export class ValidationError extends HttpError {}

export class InvalidEmailError extends HttpError {
  constructor() {
    super();
    this.name = "InvalidEmailError";
    this.code = 422;
  }
}
