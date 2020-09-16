/**
 * Check if the given is a error received by server
 * or a client error
 *
 * - If it's error from **api request**, the `callbacks.apiError` will be called
 * with the **response body**
 *
 * - If it's a **client error**, then call `callbacks.clientError` with the error object
 *
 * @param err Error Object
 * @param callbacks Object with callbacks
 */
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
