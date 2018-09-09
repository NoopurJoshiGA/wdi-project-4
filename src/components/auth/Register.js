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
    type: 'photographer',
    postcode: 'WD171BN',
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
  //
  // handleClick = (event) => {
  //   console.log('the button was clicked');
  //   this.setState({ interests: event.target.value });
  //   console.log('interests are', this.state.interests);
  // }

  // addInterest = (event) => {
  //
  // }

  render() {
    return (
      <section className="registerSection">
        <form className="section form" onSubmit={this.handleSubmit}>

          <h2>Create an account</h2>

          {/* First Name */}
          <input
            onChange={this.handleChange}
            className="input"
            name="firstName"
            placeholder="e.g. Mila"
            type="text"
            value={this.state.firstName || ''}>
          </input>

          {/* Last Name */}
          <input
            onChange={this.handleChange}
            className="input"
            name="lastName"
            placeholder="e.g. Kunis"
            type="text"
            value={this.state.lastName || ''}>
          </input>

          {/* Email */}
          <input
            onChange={this.handleChange}
            className="input"
            name="email"
            placeholder="e.g. example@email.com"
            type="email"
            value={this.state.email || ''}>
          </input>

          {/* Username */}
          <input
            onChange={this.handleChange}
            className="input"
            name="username"
            placeholder="e.g. milakunis"
            type="text"
            value={this.state.username || ''}>
          </input>

          {/* Type */}
          <div>
            <select className="input" onChange={this.handleChange}>
              <option>model</option>
              <option>photographer</option>
            </select>
          </div>

          {/* Profile Pic */}
          <input
            onChange={this.handleChange}
            className="input"
            name="profilePic"
            placeholder="e.g. https://"
            type="text"
            value={this.state.profilePic || ''}>
          </input>

          {/* Interests */}
          <p>Choose your interests</p>
          <div className="field is-grouped">
            <p className="control"><button onClick={this.handleClick} value={this.state.fashion || ''} className="button is-small is-primary is-outlined">Fashion</button></p>
            <p className="control"><button className="button is-small is-primary is-outlined">Urban</button></p>
            <p className="control"><button className="button is-small is-primary is-outlined">Portraits</button></p>
            <p className="control"><button className="button is-small is-primary is-outlined">Night</button></p>
          </div>

          {/* Postcode */}
          <input
            onChange={this.handleChange}
            className="input"
            name="postcode"
            placeholder="e.g. EC171BN"
            type="postcode"
            value={this.state.postcode || ''}>
          </input>

          {/* Password */}
          <input
            onChange={this.handleChange}
            className="input"
            name="password"
            placeholder="e.g. pass"
            type="password"
            value={this.state.password || ''}>
          </input>

          {/* Password confirmation */}
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
