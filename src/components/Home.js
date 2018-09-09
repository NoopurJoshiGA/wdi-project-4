import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Home extends React.Component {

  render() {
    return(
      <section className="homeSection">
        <h1 className="title is-1 has-text-white has-text-centered">Boke</h1>
        <div className="columns is-multiline">
          <div className="split-top column is-6">
            <button className="button">Photographer</button>
          </div>
          <div className="split-bottom column is-6">
            <button className="button">Model</button>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Home);
