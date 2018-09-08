import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Home extends React.Component {

  render() {
    return(
      <section>
        <h1 className="title is-1 has-text-white has-text-centered">Boke</h1>
        <div className="columns is-multiline">
          <img src="https://stylewhack.com/wp-content/uploads/2017/11/IMG_0720.jpg" />
          <img src="https://static1.squarespace.com/static/576ef902d1758ef2e6dada3d/576f03126a4963e880312dde/583dcce7b3db2b24516db747/1480445534740/IMG_0439.JPG?format=2500w" />
        </div>
      </section>
    );
  }
}

export default withRouter(Home);
