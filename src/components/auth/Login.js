import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class AuthLogin extends React.Component {

  state = {
    // prepopulate for test purposes
    // TODO: remove this before deployment!
    email: 'milakunis@email.com',
    password: 'pass'
  }

  handleChange = (event) => {
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
    // console.log(this.state.email, this.state.password);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('logging in user..', this.state.email, this.state.password);
    // make a request to the database
    axios
      .post('/api/login', this.state)
      .then(res => {
        const token = res.data.token;
        // we are logged in once the token is stored
        // import auth, which will allow us to use the methods
        Auth.setToken(token);
        // redirect to the users page
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log(err.response); // will return 401 or 500 if login is incorrect (eg: not authorized)
        // redirect to the current page
        this.props.history.push(this.props.location.pathname);
      });
  }

  render() {
    return (
      <section className="loginSection">
        <form className="section form" onSubmit={this.handleSubmit}>

          <h2>Login</h2>
          <input
            className="input"
            name="email"
            placeholder="Email"
            type="example@email.com"
            value={this.state.email || ''}
            onChange={this.handleChange}>
          </input>

          <input
            className="input"
            name="password"
            placeholder="Password"
            type="password"
            value={this.state.password || ''}
            onChange={this.handleChange}>
          </input>

          <button className="button is-primary is-fullwidth" type="submit">Login</button>
        </form>

      </section>
    );
  }
}

export default AuthLogin;
