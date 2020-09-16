export default function isHttpError(err: any) {
  if (err.response) {
    return true;
  } else {
    return false;
  }
}
