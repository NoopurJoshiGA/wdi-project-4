import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Header extends React.Component {

  state = {
    toggleNavbar: false
  }

  handleToggle = () => {
    const toggle = !this.state.toggleNavbar;
    this.setState({ toggleNavbar: toggle});
    console.log('toggleNavbar', toggle);
  }

  handleLogout = () => {
    Auth.removeToken();
    console.log('user has logged out...');
    this.props.history.push('/');
  }

  render() {

    return(
      <header className="navbar">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="mobile">
              <nav className="navbar mobile" role="navigation"  aria-label="main navigation">
                <div className="navbar-brand">
                  <a role="button" className={`navbar-burger ${this.state.toggleNavbar ? 'is-active': ''}`} onClick={this.handleToggle} aria-label="menu" aria-expanded="false"  data-target="navMenu" d>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </a>
                </div>
                <div className={`navbar-menu ${this.state.toggleNavbar ? 'is-active': ''}`}>
                  {Auth.isAuthenticated() && <Link className="navbar-item discoverButton" to="/users">Discover</Link>}
                  {Auth.isAuthenticated() && <Link className="navbar-item" to="/images/new">Upload Image</Link>}
                  {Auth.isAuthenticated() && <Link className="navbar-item" to={`/users/${Auth.currentUserId()}/edit`}>Edit Profile</Link>}
                  {Auth.isAuthenticated() && <Link className="navbar-item" to={`/users/${Auth.currentUserId()}`}>Profile</Link>}
                  {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
                  {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
                  {Auth.isAuthenticated() &&
                  <a className="navbar-item logoutButton" onClick={this.handleLogout}>Log out {Auth.currentUsername()}</a>}
                </div>
              </nav>
            </div>
          </div>
        </nav>
      </header>

    );
  }
}

export default withRouter(Header);
