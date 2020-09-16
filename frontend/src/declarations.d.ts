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
enum ErrorCodes {
  MISSING_FIELD = "missing_field",
  SHOULD_BE_STRING = "should_be_string",
  INVALID_EMAIL = "invalid_email",
  NOT_FOUND = "not_found",
  ALREADY_EXISTS = "already_exists",
  INTERNAL_ERROR = "internal_error",
  INVALID_USERS_LENGTH = "invalid_users_length",
}

/**
 * Model of Database Person
 */
declare interface Person {
  _id: string;
  name: string;
  email: string;
  friend?: string;
}

/**
 * Default format of API Response in
 * error requests
 */
declare interface ApiErrorBody {
  error: ErrorCodes;
  description?: string;
  code: number;
}
