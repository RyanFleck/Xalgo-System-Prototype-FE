import axios from 'axios';
import axiosRetry from 'axios-retry';
import { createContext } from 'react';
import { getBackendURL } from './urls';

axiosRetry(axios, { retries: 3 });
const backendUrl = getBackendURL();
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// DO NOT USE AXIOS OUTSIDE OF THIS PAGE.

// Token Info
// Access Token expires after five minutes.
// Refresh Token expires after 14 days.

// Build URLs
// const registrationURL = `${backendUrl}/rest-auth/registration/`;
const loginURL = `${backendUrl}/api/token/obtain/`;
// const refreshURL = `${backendUrl}/api/token/refresh/`;

// Context Object
export const Credentials = createContext({
  credentials: {
    authenticated: false,
    token: '',
    tokenExpiry: null,
    refreshToken: '',
    refreshTokenExpiry: null,
  },
  setCredentials: (credentials) => {},
});

export function login(username, password, errorMsgFunction, successFunction) {
  axios
    .post(
      loginURL,
      {
        username: username,
        password: password,
      },
      config
    )
    .then((response) => {
      successFunction(response);
    })
    .catch((error) => {
      errorMsgFunction(error);
    });
}

export function signUp(username, email, password1, password2, errorMsgFunction, successFunction) {
  return false; // Disable this functionality for now.
  /*
  axios
    .post(
      registrationURL,
      {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      },
      config
    )
    .then((response) => {
      successFunction(response);
    })
    .catch((error) => {
      errorMsgFunction(error);
    });
    */
}

export function isAccessTokenValid() {
  const token = localStorage.getItem('token') || null;
  const tokenExpiry = Date.parse(localStorage.getItem('token-expiry')) || null;
  if (token == null || tokenExpiry == null) return false;
  console.log(token);
  console.log(tokenExpiry);
  return false;
}

export function isRefreshTokenValid() {
  const refreshToken = localStorage.getItem('refresh-token') || null;
  const refreshTokenExpiry = Date.parse(localStorage.getItem('refresh-token-expiry')) || null;
  console.log(refreshToken);
  console.log(refreshTokenExpiry);
  return false;
}

export function isExpiryDateValid(date) {
  if (date instanceof Date) {
    const now = new Date();
    return date.getTime() >= now.getTime();
  } else {
    throw new Error('A non-Date object was passed to the isExpiryDateValid function.');
  }
}
