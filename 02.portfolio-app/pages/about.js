import Link from 'next/link';
import { Component } from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';
import Error from '../pages/_error';

class About extends Component {
  state = {
    user: null
  }

  // componentDidMount() {
  //   fetch('https://api.github.com/users/myuser')
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({ user: data })
  //     })
  // }

  static async getInitialProps() {
    const res = await fetch('https://api.github.com/users/sorin21');
    const statusCode = res.status > 200 ? res.status : false;
    const data = await res.json();

    // fetch('https://api.github.com/users/sorin21')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //   })

    return {
      user: data,
      statusCode
    }
  }

  render() {
    const { user, statusCode } = this.props;

    if (statusCode) {
      return <Error statusCode={statusCode} />
    }
    return (
      <Layout title="About">
        <p>Be a better programmer</p>
        <p>Name: {user.login}</p>

        <img src={user.avatar_url} height="200px" alt="Me" />
      </Layout>
    )
  }
}

export default About;
