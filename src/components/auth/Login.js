import React from 'react';

class AuthLogin extends React.Component {

  state = {
    // prepopulate for test purposes
    // TODO: remove this before deployment!
    // email: 'noopurjoshi@email.com',
    // password: 'pass'
  }

  handleChange = (event) => {
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
    // console.log(this.state.email, this.state.password);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('logging in user..', this.state.email, this.state.password);
  }

  render() {
    return (
      <section>
        <form className="form" onSubmit={this.handleSubmit}>

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

          <button className="button is-outlined is-primary" type="submit">Login</button>
        </form>

      </section>
    );
  }
}

export default AuthLogin;
