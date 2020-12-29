/**
 * Returns backend url, without ending slash.
 */
export function getBackendURL() {
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === ''
  ) {
    return 'http://localhost:8000';
  } else {
    return 'https://xalgo-system.herokuapp.com';
  }
}
