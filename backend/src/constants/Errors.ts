export enum ErrorCodes {
  MISSING_FIELD = "missing_field",
  SHOULD_BE_STRING = "should_be_string",
  INVALID_EMAIL = "invalid_email",
  NOT_FOUND = "not_found",
  ALREADY_EXISTS = "already_exists",
  INTERNAL_ERROR = "internal_error",
}

export class HttpError extends Error {
  public statusCode: number;
  public errorCode: ErrorCodes;
  public description?: string;

  constructor() {
    super("A HttpError ocurred");
    this.name = "HttpError";

    // Recommended by Typescript
    // @see https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super();
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.errorCode = ErrorCodes.NOT_FOUND;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class AlreadyExistsError extends HttpError {
  constructor() {
    super();
    this.name = "AlreadyExistsError";
    this.statusCode = 409;
    this.errorCode = ErrorCodes.ALREADY_EXISTS;

    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
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

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
