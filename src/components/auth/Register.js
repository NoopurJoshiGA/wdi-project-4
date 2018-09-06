import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class AuthRegister extends React.Component {

  state = {
    passwordHidden: true,
    firstName: 'Mila',
    lastName: 'Kunis',
    username: 'milakunis',
    email: 'milakunis@email.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  }

  handleSubmit = (event) => {
    event.preventDefault(); // stop form from refreshing
    console.log('this.state is:', this.state);
    if(this.state.password !== this.state.passwordConfirmation) {
      const errors = this.state.errors;
      errors.passwordConfirmation = 'Passwords do not match';
      return this.setState({ errors });
    }
    // make a request to the db
    // if there are fields that aren't needed on the state, mongoose ignores it.
    axios
      .post('/api/register', this.state)
      .then(res => {
        const token = res.data.token;
        // we are logged in once the token is stored
        // import auth, which will allow us to use the methods
        Auth.setToken(token);
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  handleChange = (event) => {
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <section>
        <form className="section form" onSubmit={this.handleSubmit}>

          <input
            onChange={this.handleChange}
            className="input"
            name="firstName"
            placeholder="e.g. Mila"
            type="text"
            value={this.state.firstName || ''}>
          </input>

          <input
            onChange={this.handleChange}
            className="input"
            name="lastName"
            placeholder="e.g. Kunis"
            type="text"
            value={this.state.lastName || ''}>
          </input>

          <input
            onChange={this.handleChange}
            className="input"
            name="email"
            placeholder="e.g. example@email.com"
            type="email"
            value={this.state.email || ''}>
          </input>

          <input
            onChange={this.handleChange}
            className="input"
            name="username"
            placeholder="e.g. milakunis"
            type="text"
            value={this.state.username || ''}>
          </input>

          <input
            onChange={this.handleChange}
            className="input"
            name="password"
            placeholder="e.g. pass"
            type="password"
            value={this.state.password || ''}>
          </input>

          <input
            onChange={this.handleChange}
            className="input"
            name="passwordConfirmation"
            placeholder="e.g. pass"
            type="password"
            value={this.state.passwordConfirmation || ''}>
          </input>

          <button className="button is-fullwidth is-primary" type="submit">Register</button>

        </form>
      </section>
    );
  }
}

export default AuthRegister;
