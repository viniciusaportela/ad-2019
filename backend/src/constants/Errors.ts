export enum ErrorCodes {
  MISSING_FIELD = "missing_field",
  SHOULD_BE_STRING = "should_be_string",
  INVALID_EMAIL = "invalid_email",
  NOT_FOUND = "not_found",
  ALREADY_EXISTS = "already_exists",
}

export class HttpError extends Error {
  public statusCode: number;
  public errorCode: ErrorCodes;
  public description?: string;

  constructor() {
    super("A HttpError ocurred");
    this.name = "HttpError";
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super();
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.errorCode = ErrorCodes.NOT_FOUND;
  }
}

export class AlreadyExistsError extends HttpError {
  constructor() {
    super();
    this.name = "AlreadyExistsError";
    this.statusCode = 409;
    this.errorCode = ErrorCodes.ALREADY_EXISTS;
  }
}

export class ValidationError extends HttpError {
  public field: string;

  constructor(errorCode: ErrorCodes, field: string) {
    super();
    this.name = "ValidationError";
    this.statusCode = 422;
    this.errorCode = errorCode;
    this.field = field;
  }
}
