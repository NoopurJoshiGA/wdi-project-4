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
      <header className="navbar is-fixed-top">
        <div className="container">
          <nav className="navbar mobile" role="navigation" aria-label="main navigation">
            {<Link to="/">
              <div className="navbar-brand">
                <div className="logo-brand"></div>
                <div className="logo"></div>
                <a role="button" className={`navbar-burger ${this.state.toggleNavbar ? 'is-active': ''}`} onClick={this.handleToggle} aria-label="menu" aria-expanded="false"  data-target="navMenu" d>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
            </Link>}

            <div className={`navbar-menu ${this.state.toggleNavbar ? 'is-active': ''}`}>
              <div className="navbar-end">
                {Auth.isAuthenticated() && <Link className="navbar-item discoverButton" to="/users">Discover</Link>}
                {Auth.isAuthenticated() && <Link className="navbar-item" to="/images/new">Upload Image</Link>}
                {Auth.isAuthenticated() && <Link className="navbar-item" to={`/users/${Auth.currentUserId()}/edit`}>Edit Profile</Link>}
                {Auth.isAuthenticated() && <Link className="navbar-item" to={`/users/${Auth.currentUserId()}`}>Profile</Link>}
                {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
                {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Sign Up</Link>}
                {Auth.isAuthenticated() && <a className="navbar-item logoutButton" onClick={this.handleLogout}>Log out {Auth.currentUsername()}</a>}
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
