import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class UsersEdit extends React.Component {

  state = {
    // modalIsOpen: false
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
    axios.put(`/api/users/${userId}`, this.state, Auth.bearerHeader())
      .then(() => this.props.history.push(`/users/${userId}`));
  }

  handleChange = ({ target: {name, value} }) => {
    console.log('Handle change is called...', name, value);
    this.setState({ [name]: value });
  }

  deleteUserAccount = () => {
    console.log('deleting user account...');
    axios.delete(`/api/users/${this.props.match.params.id}`, Auth.bearerHeader())
      .then(() => this.props.history.push('/login'));
  }

  render() {
    // test
    console.log('This is the state', this.state);

    return (

      <section className="section editProfile">
        <h2 className="title is-2 has-text-white">Edit your profile</h2>

        <form onSubmit={this.handleSubmit} className="form">
          {/* First Name */}
          <input
            onChange={this.handleChange}
            className="input"
            name="firstName"
            type="text"
            value={this.state.firstName || ''}>
          </input>

          {/* Last Name */}
          <input
            onChange={this.handleChange}
            className="input"
            name="lastName"
            type="text"
            value={this.state.lastName || ''}>
          </input>

          {/* Email */}
          <input
            onChange={this.handleChange}
            className="input"
            name="email"
            type="email"
            value={this.state.email || ''}>
          </input>

          {/* Username */}
          <input
            onChange={this.handleChange}
            className="input"
            name="username"
            type="text"
            value={this.state.username || ''}>
          </input>

          {/* Type */}
          <div className="select is-fullwidth">
            <select onChange={this.handleChange}>
              <option>model</option>
              <option>photographer</option>
            </select>
          </div>

          {/* Postcode */}
          <input
            onChange={this.handleChange}
            className="input"
            name="postcode"
            type="postcode"
            value={this.state.postcode || ''}>
          </input>

          {/* Password */}
          <input
            onChange={this.handleChange}
            className="input"
            name="password"
            type="password"
            value={this.state.password || ''}>
          </input>

          {/* Password confirmation */}
          <input
            onChange={this.handleChange}
            className="input"
            name="passwordConfirmation"
            type="password"
            value={this.state.passwordConfirmation || ''}>
          </input>

          <button className="button is-fullwidth is-primary">Save changes</button>
        </form>

        {/* Delete user account */}
        {Auth.currentUserId() === this.props.match.params.id  &&
        <button onClick={this.deleteUserAccount} className="button deleteUserAccountBtn is-fullwidth rounded is-primary is-outlined">Delete Account</button>
        }
      </section>
    );
  }
}

export default UsersEdit;
