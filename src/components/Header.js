import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return(
      <header>
        <nav className="navbar has-background-light">
          <div className="navbar-brand">BOKE</div>
          <a role="button" className="navbar-burger is-active" aria-label="menu" aria-expanded="false" data-target="navMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          <div className="navbar-end">
            <Link className="navbar-item has-background-primary button" to="/users">Discover</Link>
            <Link className="navbar-item" to="/login">Login</Link>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
