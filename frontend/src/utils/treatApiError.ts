export default function treatApiError(
  err: any,
  callbacks: {
    apiError?: (body: ApiErrorBody) => void;
    clientError?: (err: any) => void;
  }
) {
  if (err.response) {
    callbacks.apiError && callbacks.apiError(err.response.data);
  } else {
    callbacks.clientError && callbacks.clientError(err);
  }
}
