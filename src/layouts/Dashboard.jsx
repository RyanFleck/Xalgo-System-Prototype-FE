// libraries
import React from 'react';
import Box from '../components/layout/Box';
import Grid from '../components/layout/Grid';
import Card from '../components/patterns/Card';
import Flex from '../components/layout/Flex';

import Intro from './components/Intro';

// rm-components
import Text from '../components/primitives/Text';
import ScrollUp from './components/ScrollUp';
//import { Link } from '@reach/router';
import Axios from 'axios';
import BarLoader from 'react-spinners/BarLoader';
import FileSaver from 'file-saver';
import slugify from 'slugify';
import { Redirect } from '@reach/router';
import { getAccessToken, preRequestRefreshAuth } from '../utils/api';
import { getBackendURL } from '../utils/urls';
import { toast } from 'react-toastify';

const hold = {
  zIndex: '5',
};

export function downloadRule(uuid, csrfToken) {
  if (!preRequestRefreshAuth()) {
    toast.error('Credentials expired, Please log in again.');
    return false;
  }
  const { token } = getAccessToken();
  const backend = getBackendURL();
  let rule_name = 'rule';
  console.log(`Downloading ${uuid}`);
  Axios.get(`${backend}/rules/json/${uuid}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res && res.status && res.status === 200) {
      const data = res.data;
      console.log(data);
      rule_name = data.metadata.rule.title;
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'text/plain;charset=utf-8',
      });
      FileSaver.saveAs(blob, `${slugify(rule_name.toLowerCase())}.xa.json`);
    }
  });
}

export function deleteRule(uuid, csrfToken) {
  console.log(`Deleting ${uuid} token ${this.props.token}`);
  const { token } = getAccessToken();
  const backend = getBackendURL();
  if (window.confirm(`Delete rule ${uuid}?`)) {
    Axios.delete(`${backend}/rules/rule/${uuid}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res && res.status && res.status === 204) {
        console.log('Rule Deleted.');
        this.getRules();
      }
    });
  }
}

// Primary Component
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDescription: 'Rule Maker Dashboard',
      rules: [],
      ready: false,
    };

    this.getRules = this.getRules.bind(this);
  }

  componentDidMount() {
    this.getRules();
  }

  getRules() {
    const { token } = getAccessToken();
    const backend = getBackendURL();
    console.log(`Using access token ${token}`);
    Axios.get(`${backend}/rules/rule`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const rules = res.data.sort((a, b) => {
          let date_a = Date.parse(a.modified);
          let date_b = Date.parse(b.modified);
          const older = date_b - date_a;
          console.log(`Comparing ${date_a} to ${date_b}, is older: ${older}`);
          return older;
        });
        console.log('Sorted rules:');
        console.log(rules);

        this.setState({ rules: rules, ready: true });
      })
      .catch((err) => {
        const status = err.response.status;
        console.log(err.response.data);
        if (status === 403) {
          console.log(`Failed to authenticate user: ${status}`);
          console.error(err);
        } else {
          console.log(`Error while getting user info: ${status}`);
          console.error(err);
        }
      });
  }

  render() {
    const { user } = this.props;
    return (
      <ScrollUp>
        <div style={hold}>
          <Grid gridTemplateRows="auto" height="100vh">
            <Box>
              <Grid gridTemplateColumns="500px auto" height="100%">
                <Intro name={user.email} />
                <Box p={4} height="auto">
                  <Text variant="formtitle">My Rules</Text>
                  <Box p={2} />
                  {this.state.ready ? (
                    <div>
                      {this.state.rules.map((e, i) => {
                        return (
                          <Card
                            key={i}
                            uuid={e.id}
                            name={e.name}
                            editLink={`/editor/${e.id}`}
                            deleteRule={deleteRule}
                            downloadRule={downloadRule}
                            csrfToken={this.props.token}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <Flex alignitems="center">
                        <BarLoader width={320} />
                      </Flex>
                    </div>
                  )}
                </Box>
              </Grid>
            </Box>
          </Grid>
        </div>
        {!this.props.authenticated ? <Redirect noThrow to="/" /> : null}
      </ScrollUp>
    );
  }
}
