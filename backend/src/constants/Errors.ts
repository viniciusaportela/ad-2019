/**
 * List of custom error codes
 * from API server
 *
 * Found in field: `error` of a response
 *
 * example:
 * ```json
 * {
 *  "field": "name",
 *  "error": "missing_field",
 *  "code": 422
 * }
 * ```
 */
export enum ErrorCodes {
  MISSING_FIELD = "missing_field",
  SHOULD_BE_STRING = "should_be_string",
  INVALID_EMAIL = "invalid_email",
  NOT_FOUND = "not_found",
  ALREADY_EXISTS = "already_exists",
  INTERNAL_ERROR = "internal_error",
  INVALID_USERS_LENGTH = "invalid_users_length",
}

/**
 * Error used when the server founds a error and need to
 * return it to user
 */
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

/**
 * A resource was not found
 */
export class NotFoundError extends HttpError {
  constructor() {
    super();
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.errorCode = ErrorCodes.NOT_FOUND;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * This error is throw when **there no person** to sent a email, or a
 * **odd number of people**
 */
export class InvalidUsersLength extends HttpError {
  constructor(description?: string) {
    super();
    this.name = "InvalidUsersLength";
    this.statusCode = 422;
    this.errorCode = ErrorCodes.INVALID_USERS_LENGTH;
    this.description = description;

    Object.setPrototypeOf(this, InvalidUsersLength.prototype);
  }
}

/**
 * A resource already exists in database
 */
export class AlreadyExistsError extends HttpError {
  constructor() {
    super();
    this.name = "AlreadyExistsError";
    this.statusCode = 409;
    this.errorCode = ErrorCodes.ALREADY_EXISTS;

    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
  }
}

/**
 * The given inputs are invalid (body, query, params)
 */
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
