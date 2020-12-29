// libraries
import React, { useState } from 'react';
import { Redirect } from '@reach/router';
import Box from '../components/layout/Box';
import Grid from '../components/layout/Grid';

// rm-components
import Text from '../components/primitives/Text';
import ScrollUp from './components/ScrollUp';
import Flex from '../components/layout/Flex';
import Input from '../components/primitives/Input';
import { getAccessToken, getRefreshToken, login } from '../utils/api';

// style
const inputHold = {
  height: '90vh',
};

const widthHold = {
  width: '80%',
};

// Primary Component
function Login({ authenticated, credentials, setCredentials }) {
  const [exceptions, setExceptions] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onError(e) {
    console.log('Login Error');
    console.error(e);
    console.log(Object.keys(e.response.data));
    let msg = '';
    Object.keys(e.response.data).forEach((key) => {
      msg += "'" + key + "': " + e.response.data[key] + '\n';
    });
    setExceptions(msg);
  }

  function onSuccess(e) {
    console.log('Login Success');
    console.log(e);

    // Get new saved credentials.
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
  }

  function submit(e) {
    e.preventDefault();
    console.log('Attempting to log in...');
    login(username, password, onError, onSuccess);
  }

  return (
    <ScrollUp>
      <Grid gridTemplateColumns="50% 50%">
        <div style={inputHold}>
          <Flex alignItems="center" justifyContent="center">
            <div style={widthHold}>
              <Text variant="subtitle">Log In</Text>
              <Box m={2} />
              <Text>Username</Text>
              <Box m={1} />
              <form onSubmit={submit}>
                <label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </label>
                <Box m={1} />
                <label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </label>
                <Box m={1} />
                {exceptions ? <code id="form-errors">{exceptions}</code> : null}
                <Box m={1} />
                <label>
                  <Input type="submit" value="Submit" />
                </label>
              </form>
            </div>
            <div style={inputHold} />
          </Flex>
        </div>
        <Box borderLeft="1px solid #efefef" />
      </Grid>
      {authenticated ? <Redirect noThrow to="/dashboard" /> : null}
    </ScrollUp>
  );
}

export default Login;
