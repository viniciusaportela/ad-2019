export default function treatApiError(
  err: any,
  isHttpErrorCallback: (body: ApiErrorBody) => void,
  isNotHttpErrorCallback: (err: any) => void
) {
  if (err.response) {
    isHttpErrorCallback(err.response.body);
  } else {
    isNotHttpErrorCallback(err);
  }
}
