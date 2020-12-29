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

// Build URLs
const registrationURL = `${backendUrl}/rest-auth/registration/`;
const loginURL = `${backendUrl}/jwt-auth/token/obtain/`;

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
}
