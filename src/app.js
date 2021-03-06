import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Components
// Common
import Header from './components/Header';
import Home from './components/Home';
import FlashMessages from './components/common/FlashMessages';


// Auth
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';

// User Components
import UsersIndex from './components/users/Index';
import UsersShow from './components/users/Show';
import UsersEdit from './components/users/Edit';

// Image Components
import ImagesShow from './components/images/Show';
import ImagesNew from './components/images/New';
import ImagesEdit from './components/images/Edit';

// Map
import 'leaflet/dist/leaflet.css';

// Styles
import 'bulma/css/bulma.css';
import './scss/style.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

library.add( faHeart );
library.add( faEnvelope );

class App extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <FlashMessages />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={AuthLogin} />
          <Route exact path="/register" component={AuthRegister} />
          <Route exact path="/users" component={UsersIndex} />
          <Route exact path="/users/:id/edit" component={UsersEdit} />
          <Route path="/users/:id" component={UsersShow} />
          <Route exact path="/images/new" component={ImagesNew} />
          <Route path="/images/:id/edit" component={ImagesEdit} />
          <Route path="/images/:id" component={ImagesShow} />
        </Switch>
      </main>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
