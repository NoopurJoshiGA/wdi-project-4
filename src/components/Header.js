import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Header extends React.Component {

  handleLogout = () => {
    Auth.removeToken();
    console.log('user has logged out...');
    this.props.history.push('/');
  }

  render() {
    return(
      <header>

        <nav className="navbar has-background-light">
          <div className="navbar-brand">BOKE</div>
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          <div className="navbar-end">
            {Auth.isAuthenticated() && <Link className="navbar-item has-background-primary button" to="/users">Discover</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item has-background-primary button" to="/images/new">Upload Image</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item has-background-primary button" to={`/users/${Auth.currentUserId()}`}>Profile</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item has-background-primary button" to={`/users/${Auth.currentUserId()}/edit`}>Edit Profile</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
            {Auth.isAuthenticated() &&
              <a className="navbar-item" onClick={this.handleLogout}>Log out {Auth.currentUsername()}</a>}
          </div>
        </nav>
      </header>

    );
  }
}

export default withRouter(Header);
