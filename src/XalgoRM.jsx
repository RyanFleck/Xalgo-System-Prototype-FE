import React, { useEffect, useState } from 'react';
import Application from './layouts/Application';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Credentials, getAccessToken, getRefreshToken, isAuthenticated } from './utils/api.js';

function XalgoRM() {
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
    if (credentials.authenticated == null) {
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
          console.log('New Credentials:');
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
  }, [credentials]);

  return (
    <div className="XalgoRM">
      <Credentials.Provider value={{ credentials, setCredentials }}>
        <Application
          user={user}
          username={username}
          token={credentials.token}
          authenticated={credentials.authenticated}
          credentials={credentials}
          setCredentials={setCredentials}
        />
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
