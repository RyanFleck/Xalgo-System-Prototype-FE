import React, { useEffect, useState } from 'react';
import Application from './layouts/Application';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/lib/style.css';
import {
  Credentials,
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  wakeUpBackend,
} from './utils/api.js';
import { ClockLoader } from 'react-spinners';

function XalgoRM() {
  const [backendUp, setBackendUp] = useState(null);
  const [credentials, setCredentials] = useState({
    authenticated: null,
    token: '',
    tokenExpiry: null,
    refreshToken: '',
    refreshTokenExpiry: null,
  });

  // We can get user data on login.
  const username = 'Anon';
  const user = {};

  useEffect(() => {
    if (backendUp === null) {
      setBackendUp(false);
      wakeUpBackend(() => {
        setBackendUp(true);
      });
    }
    if (credentials.authenticated === null) {
      // Get new saved credentials.
      isAuthenticated().then((authenticated) => {
        if (authenticated) {
          console.log('User is still authenticated.');
          const { token, expiry } = getAccessToken();
          const { refreshToken, refreshTokenExpiry } = getRefreshToken();

          // Update Credentials
          const newCredentials = { ...credentials };
          newCredentials.authenticated = true;
          newCredentials.token = token;
          newCredentials.tokenExpiry = expiry;
          newCredentials.refreshToken = refreshToken;
          newCredentials.refreshTokenExpiry = refreshTokenExpiry;
          console.log('Credentials:');
          console.log(newCredentials);
          setCredentials(newCredentials);
        } else {
          console.log('User is not authenticated.');
          const newCredentials = { ...credentials };
          newCredentials.authenticated = false;
          setCredentials(newCredentials);
        }
      });
    }
  }, [credentials, backendUp]);

  return (
    <div className="XalgoRM">
      <Credentials.Provider value={{ credentials, setCredentials }}>
        {credentials.authenticated === null || backendUp !== true ? (
          <div id="loading-box">
            <h1>{'LOADING'}</h1>
            <p>Authenticated: {credentials.authenticated ? 'Yes' : 'No'}</p>
            <p>Backend Up: {backendUp ? 'Ready!' : 'Waiting...'}</p>
            <br />
            <ClockLoader size={100} />
          </div>
        ) : (
          <Application
            user={user}
            username={username}
            token={credentials.token}
            authenticated={credentials.authenticated}
            credentials={credentials}
            setCredentials={setCredentials}
          />
        )}
      </Credentials.Provider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Slide}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default XalgoRM;
