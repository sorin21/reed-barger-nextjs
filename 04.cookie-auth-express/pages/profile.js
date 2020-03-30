import React, { Component } from 'react';

import Layout from '../components/Layout';
import { getUserProfile, authInitialProps } from '../lib/auth';

class Profile extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    // because we use a promise in getUserProfile, we can use then
    getUserProfile().then(user => this.setState({ user }))
  }

  render() {
    return (
      <Layout title="User Profile" {...this.props}>
        <pre>
          {JSON.stringify(this.state.user, null, 2)}
        </pre>
      </Layout>
    );
  }
}

Profile.getInitialProps = authInitialProps();

export default Profile;