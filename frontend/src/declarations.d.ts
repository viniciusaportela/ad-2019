enum ErrorCodes {
  MISSING_FIELD = "missing_field",
  SHOULD_BE_STRING = "should_be_string",
  INVALID_EMAIL = "invalid_email",
  NOT_FOUND = "not_found",
  ALREADY_EXISTS = "already_exists",
  INTERNAL_ERROR = "internal_error",
  INVALID_USERS_LENGTH = "invalid_users_length",
}

declare interface Person {
  _id: string;
  name: string;
  email: string;
  friend?: string;
}

declare interface ApiErrorBody {
  error: ErrorCodes;
  description?: string;
  code: number;
}
