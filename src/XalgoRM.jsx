import React, { useEffect, useState } from 'react';
import Application from './layouts/Application';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Credentials } from './utils/api.js';

function XalgoRM() {
  const [credentials, setCredentials] = useState({
    authenticated: false,
    token: '',
    tokenExpiry: null,
    refreshToken: '',
    refreshTokenExpiry: null,
  });

  // We can get user data on login.
  const username = 'Anon';
  const user = {};

  useEffect(() => {
    if (!credentials.authenticated) {
      const newCreds = { ...credentials };
      newCreds.authenticated = true;
      setCredentials(newCreds);
      console.log(newCreds);
    }
  }, [credentials]);

  return (
    <div className="XalgoRM">
      <Credentials.Provider value={{ credentials, setCredentials }}>
        <Application user={user} username={username} token={credentials.token} authenticated={credentials.authenticated} />
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
