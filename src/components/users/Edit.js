import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
// import { Link } from 'react-router-dom';

// import Flash from '../../lib/Flash';

import ReactFilestack from 'filestack-react';

class UsersEdit extends React.Component {

  state = {
    errors: {},
    active: false,
    defaultProfilePic: 'https://kirche-wagenfeld.de/wp-content/uploads/2018/03/default-profile.png'
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState(res.data)); // putting it on setState will prepopulate the field data
  }

  handleSubmit = (event) => {
    event.preventDefault(); // don't refresh the page
    // get the Id of the user
    const userId = this.props.match.params.id;
    console.log('Form submitted!', this.state);
    axios
      .put(`/api/users/${userId}`, this.state, Auth.bearerHeader())
      .then(() => this.props.history.push(`/users/${userId}`))
      .catch(err => {
        console.log('err.response is',err.response);
        // ... is combining two objects together
        const errors = { ...this.state.errors, ...err.response.data.errors };
        console.log(err.response.data.errors);
        this.setState({ errors });
      });
  }

  handleChange = ({ target: {name, value} }) => {
    console.log('Handle change is called...', name, value);
    this.setState({ [name]: value });
  }

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
    console.log('the modal is open', this.currentState);
  }

  deleteUserAccount = () => {
    const showModalForm = !showModalForm;
    this.setState({ showModalForm: showModalForm });
    console.log('opening modal form');
    axios.delete(`/api/users/${this.props.match.params.id}`, Auth.bearerHeader())
      .then(
        () => {
          Auth.removeToken();
          this.props.history.push('/');
          console.log('users account has been deleted and logged out...');
        });
  }


  onSuccess = (result) => {
    this.setState({
      profilePic: result.filesUploaded[0].url
    });
  }

  onError = (error) => {
    console.error('error', error);
  }

  render() {
    // test
    console.log('This is the state', this.state);

    return (

      <section className="section has-text-centered editProfile">
        <h2>Edit your profile</h2>

        <div className="has-text-centered">
          <img className="profilePic" src={this.state.profilePic || this.state.defaultProfilePic} />
        </div>


        <form onSubmit={this.handleSubmit} className="form">
          <ReactFilestack
            apikey="AttzzTT2qRw6FJXs4TnD6z"
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
            type="text"
            value={this.state.firstName || ''}>
          </input>
          <span className="validation">{this.state.errors.firstName}</span>

          {/* Last Name */}
          <input
            onChange={this.handleChange}
            className="input"
            name="lastName"
            type="text"
            value={this.state.lastName || ''}>
          </input>
          <span className="validation">{this.state.errors.lastName}</span>

          {/* Email */}
          <input
            onChange={this.handleChange}
            className="input"
            name="email"
            type="email"
            value={this.state.email || ''}>
          </input>
          <span className="validation">{this.state.errors.email}</span>

          {/* Username */}
          <input
            onChange={this.handleChange}
            className="input"
            name="username"
            type="text"
            value={this.state.username || ''}>
          </input>
          <span className="validation">{this.state.errors.username}</span>

          {/* Type */}
          <div className="is-fullwidth">
            <select name="type" onChange={this.handleChange} value={this.state.type} className="input">
              <option value="model">model</option>
              <option value="photographer">photographer</option>
            </select>
          </div>
          <span className="validation">{this.state.errors.type}</span>

          {/* Interests */}
          <input
            onChange={this.handleChange}
            className="input"
            name="interests"
            type="text"
            placeholder="Interests, separated with a space"
            value={this.state.interests || ''}>
          </input>

          {/* Profile Pic */}
          {/* <input
          //   onChange={this.handleChange}
          //   className="input"
          //   name="profilePic"
          //   placeholder="e.g. https://"
          //   type="text"
          //   value={this.state.profilePic || ''}>
          // </input> */}


          {/* Postcode */}
          <input
            onChange={this.handleChange}
            className="input"
            name="postcode"
            type="postcode"
            value={this.state.postcode || ''}>
          </input>
          <span className="validation">{this.state.errors.postcode}</span>

          {/* Password */}
          {/* <input
            onChange={this.handleChange}
            className="input"
            name="password"
            type="password"
            value={this.state.password || ''}>
          </input> */}

          {/* Password confirmation */}
          {/* <input
            onChange={this.handleChange}
            className="input"
            name="passwordConfirmation"
            type="password"
            value={this.state.passwordConfirmation || ''}>
          </input> */}

          <button className="button is-fullwidth is-primary">Save changes</button>
        </form>

        {/* Delete user account */}
        {Auth.currentUserId() === this.props.match.params.id  &&
        <button onClick={this.toggleClass} className="deleteUserAccountButton">Delete Account</button>
        }


        <div className={`${this.state.active ? 'is-active': null} modal `}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <section className="modal-card-body">
              <h5 className="title is-5">Are you sure you want to leave the Boke tribe?</h5>
            </section>
            <footer className="modal-card-foot">
              <button onClick={this.deleteUserAccount} className="modalButton">Yes</button>
              <button onClick={this.toggleClass} className="modalButton">Cancel</button>
            </footer>
          </div>
        </div>

      </section>
    );
  }
}

export default UsersEdit;
