import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Home extends React.Component {

  render() {
    return(
      <section className="hero is-fullheight">
        <div className="hero-body">
        </div>
      </section>
    );
  }
}

export default withRouter(Home);
