import React, { Component } from 'react';
import Router from 'next/router';
import { loginUser } from '../lib/auth';

class LoginForm extends Component {
  state = {
    email: 'Sincere@april.biz',
    password: 'hildegard.org',
    error: '',
    isLoading: false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    // if we had an error before, will be removed
    this.setState({ error: '', isLoading: true });
    const { email, password } = this.state;
    loginUser(email, password)
      .then(() => {
        Router.push('/profile');
      })
      .catch(this.showError);
  }

  showError = err => {
    // will take the error that is passed in catch
    // console.error(err);
    const error = err.response && err.response.data || err.message;
    this.setState({ error, isLoading: false });

  }
  render() {
    const { email, password, error, isLoading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div><input type="email" name="email" placeholder="email" onChange={this.handleChange} value={email} /></div>
        <div><input type="password" name="password" placeholder="password" onChange={this.handleChange} value={password} /></div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending" : "Submit"}
        </button>
        {error && <div>{error}</div>}
      </form>
    );
  }
}

export default LoginForm;