import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

import { Link } from 'react-router-dom';


// External
import ReactFilestack from 'filestack-react';

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
    passwordConfirmation: 'pass',
    defaultImage: 'https://kirche-wagenfeld.de/wp-content/uploads/2018/03/default-profile.png',
    errors: {}
  }

  componentDidMount() {

  }

  handleSubmit = (event) => {
    event.preventDefault(); // stop form from refreshing
    console.log('this.state is:', this.state);
    if(this.state.password !== this.state.passwordConfirmation) {
      const errors = this.state.errors;
      errors.passwordConfirmation = 'Passwords do not match, please try again';
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
        console.log('err.response is',err.response);
        // ... is combining two objects together
        const errors = { ...this.state.errors, ...err.response.data.errors };
        console.log(err.response.data.errors);
        this.setState({ errors });
      });
  }

  handleChange = (event) => {
    const { target: { name, value }} = event;
    const errors = this.state.errors;
    delete errors[name]; // remove the error for this field
    this.setState({ [name]: value });
  }

  onSuccess = (result) => {
    this.setState({
      profilePic: result.filesUploaded[0].url
    });
  }

  onError = (error) => {
    console.error('error', error);
  }

  togglePasswordShow = () => {
    const passwordHidden = !this.state.passwordHidden;
    this.setState({ passwordHidden });
  }

  render() {
    return (
      <section className="registerSection">

        <h2>Create an account</h2>


        <form className="has-text-centered" onSubmit={this.handleSubmit}>

          <img className="profilePicRegister" src={this.state.profilePic || this.state.defaultImage} />
          <ReactFilestack
            apikey="AqGjevNLqRu22jn66Mv4Zz"
            // options={basicOptions}
            buttonText="Upload Profile Picture"
            buttonClass="filestackButton"
            onSuccess={this.onSuccess}
            onError={this.onError}
          />

          {/* First Name */}
          <input
            onChange={this.handleChange}
            className="input"
            name="firstName"
            placeholder="e.g. Mila"
            type="text"
            value={this.state.firstName || ''}>
          </input>
          <span className="validation">{this.state.errors.firstName}</span>

          {/* Last Name */}
          <input
            onChange={this.handleChange}
            className="input"
            name="lastName"
            placeholder="e.g. Kunis"
            type="text"
            value={this.state.lastName || ''}>
          </input>
          <span className="validation">{this.state.errors.lastName}</span>

          {/* Email */}
          <input
            onChange={this.handleChange}
            className="input"
            name="email"
            placeholder="e.g. example@email.com"
            type="email"
            value={this.state.email || ''}>
          </input>
          <span className="validation">{this.state.errors.email}</span>

          {/* Username */}
          <input
            onChange={this.handleChange}
            className="input"
            name="username"
            placeholder="e.g. milakunis"
            type="text"
            value={this.state.username || ''}>
          </input>
          <span className="validation">{this.state.errors.username}</span>

          {/* Type */}
          <div>
            <label htmlFor="type">Please select...</label>
            <select value={this.state.type} className="input" onChange={this.handleChange}>
              <option>model</option>
              <option>photographer</option>
            </select>
          </div>
          <span className="validation">{this.state.errors.type}</span>


          {/* Profile Pic */}
          {/* <input
            onChange={this.handleChange}
            className="input"
            name="profilePic"
            placeholder="e.g. https://"
            type="text"
            value={this.state.profilePic || ''}
          >
          </input> */}

          {/* Interests */}
          <input
            onChange={this.handleChange}
            className="input"
            name="interests"
            type="text"
            placeholder="Interests, separated with a space"
            value={this.state.interests || ''}>
          </input>

          {/* Postcode */}
          <input
            onChange={this.handleChange}
            className="input"
            name="postcode"
            placeholder="e.g. EC171BN"
            type="postcode"
            value={this.state.postcode || ''}>
          </input>
          <span className="validation">{this.state.errors.postcode}</span>

          {/* Password */}
          <input
            onChange={this.handleChange}
            className="input"
            name="password"
            placeholder="e.g. pass"
            type={this.state.passwordHidden ? 'password' : 'text'}
            value={this.state.password || ''}>
          </input>
          <span className="validation">{this.state.errors.password}</span>

          {/* Password confirmation */}
          <input
            onChange={this.handleChange}
            className="input"
            name="passwordConfirmation"
            placeholder="e.g. pass"
            type={this.state.passwordHidden ? 'password' : 'text'}
            value={this.state.passwordConfirmation || ''}>
          </input>
          <span className="validation">{this.state.errors.passwordConfirmation}</span>

          <input type="checkbox" className="checkbox" onChange={this.togglePasswordShow}></input>
          <p className="showPassword">Show Password</p>
          <button className="button is-fullwidth is-primary" type="submit">Register</button>
        </form>



        <p>Already have an account? Login <Link to="/login">here</Link></p>

      </section>
    );
  }
}

export default AuthRegister;
