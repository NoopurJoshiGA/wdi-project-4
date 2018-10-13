import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';
import Carousel from './common/Carousel';

class Home extends React.Component {

  render() {
    return(
      <section>
        <div className="homeSection">
          <Carousel />
          {/* Show discover button if user is logged in */}
          {/* {Auth.isAuthenticated() &&
            <div className="buttonWrapper">
            <button className="homeBtn"><Link to="/users">Discover</Link></button>
          </div>
        } */}
          <div className="aboutSection">
            <div className="container">
              <h2>About</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Home);
