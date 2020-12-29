import React, { useEffect, useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import Axios from 'axios';
import XalgoRM from './XalgoRM';

Axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
Axios.defaults.xsrfCookieName = 'XCSRF-TOKEN';

if (!process.env.HEROKU) {
  console.log('Deployed locally, use :8000 proxy.');
  // Axios.defaults.baseURL = 'http://localhost:8000';
}

function App() {
  const [ready, setReady] = useState(false);
  const username = 'Anon';
  const user = {};
  const token = 'none';

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 50);
  }, []);

  return (
    <div className="application-wrapper">
      {!ready ? (
        <div className="loading-wrapper">
          <div className="grid-loader">
            <GridLoader size={20} margin={15} className="grid-loader-spinner" />
          </div>
        </div>
      ) : (
        <div className="signed-in">
          {username === null ? (
            <div>
              <h1>
                <b>428</b> Precondition Required: Log In.
              </h1>
              <p>
                <a className="App-link" href="/accounts/login">
                  Please Log In.
                </a>
                {' If using the development React build, go to '}
                <a className="App-link" href="http://localhost:8000/accounts/login">
                  localhost:8000/accounts/login
                </a>
                {' instead.'}
              </p>
            </div>
          ) : (
            <XalgoRM user={user} username={username} token={token} refresh={''} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
