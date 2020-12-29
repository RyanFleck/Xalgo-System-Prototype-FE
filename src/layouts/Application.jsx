// libraries
import { Router } from '@reach/router';
import React from 'react';

// rm-components
import Box from '../components/layout/Box';

// Pages
import Browse from './Browse';
import Dashboard from './Dashboard';
import EditorV1 from './EditorV1';
import EditorV2 from './EditorV2';
import Landing from './Landing';
import Login from './Login';
import Theme from '../components/patterns/Theme';
import NewRule from './NewRule';

// other components
import ScrollUp from './components/ScrollUp';

// layouts
import Navigation from './components/Navigation';
import Query from './Query';
import Footer from './components/Footer';

// Styling

const baseBoxStyle = {
  minHeight: '100vh',
  marginTop: '73px',
  left: '0px',
  width: '100%',
  background: '#F9FBFE',
};

// Primary Component
export default Application;
function Application({ authenticated, user }) {
  return (
    <ScrollUp>
      <Theme>
        <Navigation authenticated={authenticated} user={user} />
        <Box style={baseBoxStyle}>
          <Router primary={false}>
            <Landing path="/" authenticated={authenticated} user={user} />
            <Browse path="/browse" authenticated={authenticated} user={user} />
            <EditorV1 path="/editor/v1/:ruleUUID" authenticated={authenticated} user={user} />
            <EditorV2 path="/editor/:ruleUUID" authenticated={authenticated} user={user} />
            <NewRule path="/editor" authenticated={authenticated} user={user} />
            <Login path="/login" authenticated={authenticated} user={user} />
            <Query path="/query" authenticated={authenticated} user={user} />
            <Dashboard path="/dashboard" authenticated={authenticated} user={user} />
          </Router>
        </Box>
        <Footer />
      </Theme>
    </ScrollUp>
  );
}
