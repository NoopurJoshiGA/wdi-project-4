import React from 'react';

class AuthLogin extends React.Component {

  state = {
    // prepopulate for test purposes
    // TODO: remove this before deployment!
    email: 'noopurjoshi@email.com',
    password: 'pass'
  }

  render() {
    return (
      <section>
        <form className="form">

          <input
            className="input"
            name="email"
            placeholder="Email"
            type="example@email.com"
            value={this.state.email}>
          </input>

          <input
            className="input"
            name="password"
            placeholder="Password"
            type="password"
            value={this.state.password}>
          </input>

          <button className="button is-outlined is-primary" type="submit">Login</button>
        </form>

      </section>
    );
  }
}

export default AuthLogin;
