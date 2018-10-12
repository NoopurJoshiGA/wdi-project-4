import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';
import Carousel from './common/Carousel';

class Home extends React.Component {

  render() {
    return(
      <section>
        <Carousel />
      </section>
    );
  }
}

export default withRouter(Home);
