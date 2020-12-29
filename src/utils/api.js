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
const refreshURL = `${backendUrl}/api/token/refresh/`;

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

export function getAccessToken() {
  const token = localStorage.getItem('token') || null;
  const expiry = Date.parse(localStorage.getItem('token-expiry')) || null;
  const data = {
    token: token,
    expiry: expiry,
  };
  return data;
}

export function getRefreshToken() {
  const token = localStorage.getItem('refresh-token') || null;
  const expiry = Date.parse(localStorage.getItem('refresh-token-expiry')) || null;

  const data = {
    refreshToken: token,
    refreshTokenExpiry: expiry,
  };
  return data;
}

export function setNewAccessToken(token) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  localStorage.setItem('token', token);
  localStorage.setItem('token-expiry', now);
}

export function setNewRefreshToken(token) {
  const now = new Date(Date.now() + 12096e5); // Now + two weeks in ms.
  localStorage.setItem('refresh-token', token);
  localStorage.setItem('refresh-token-expiry', now);
}

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
      console.log(response);
      if (response.data && response.data.access !== null && response.data.refresh !== null) {
        setNewAccessToken(response.data.access);
        setNewRefreshToken(response.data.refresh);
        successFunction(response);
      } else {
        throw new Error('Received an unexpected response from the server.');
      }
    })
    .catch((error) => {
      errorMsgFunction(error);
    });
}
export function logout(afterFunction) {
  localStorage.removeItem('token');
  localStorage.removeItem('token-expiry');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('refresh-token-expiry');
  afterFunction();
}

export async function isAuthenticated() {
  // If the access token is valid, return true immediately.
  if (isAccessTokenValid()) {
    console.log('Access token is still valid.');
    return true;
  }
  // If the refresh token is valid, attempt to get a new access token.
  if (isRefreshTokenValid()) {
    console.log('Getting new access token using refresh token...');
    const refreshToken = localStorage.getItem('refresh-token') || null;
    if (refreshToken == null) return false; // Fail if no refresh token.
    try {
      const response = await axios.post(
        refreshURL,
        {
          refresh: refreshToken,
        },
        config
      );
      // Response should contain new access token.
      if (response.data.access) {
        console.log('Success, got new access token.');
        setNewAccessToken(response.data.access);
        return true;
      } else {
        console.log('Failure, please log in again.');
        throw new Error('No access token in refresh response.');
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  // If neither of these operations is successful, return false.
  return false;
}

export function isAccessTokenValid() {
  const { token, expiry } = getAccessToken();
  if (token == null || expiry == null) return false;
  console.log('Access Token exists, checking expiry...');
  return isExpiryDateValid(expiry);
}

export function isRefreshTokenValid() {
  const { refreshToken, refreshTokenExpiry } = getRefreshToken();
  if (refreshToken == null || refreshTokenExpiry == null) return false;
  console.log('Refresh Token exists, checking expiry...');
  return isExpiryDateValid(refreshTokenExpiry);
}

export function isExpiryDateValid(date) {
  const now = new Date();
  if (date instanceof Date) {
    console.log('Date given as date object.');
    return date.getTime() >= now.getTime();
  } else if (typeof date === 'number') {
    console.log('Date given as number.');
    return date >= now.getTime();
  }
  console.log('Provided date is invalid.');
  return false;
}
