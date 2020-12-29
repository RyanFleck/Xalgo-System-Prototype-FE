import React, { useEffect, useState } from 'react';
import Application from './layouts/Application';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Credentials } from './utils/api.js';
import { deepCopy } from 'xalgo-rule-processor/dist/utilities';

function XalgoRM() {
  const [credentials, setCredentials] = useState({
    authenticated: false,
    token: '',
    tokenExpiry: null,
    refreshToken: '',
    refreshTokenExpiry: null,
  });
  const username = 'Anon';
  const user = {};
  const token = 'none';

  useEffect(() => {
    if (!credentials.authenticated) {
      const newCreds = deepCopy(credentials);
      newCreds.authenticated = true;
      setCredentials(newCreds);

      console.log(credentials);
    }
  }, [credentials]);

  return (
    <div className="XalgoRM">
      <Credentials.Provider value={{ credentials, setCredentials }}>
        <Application user={user} username={username} token={token} />
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
