import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Components
// Common
import Header from './components/Header';

// Auth
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';

// User Components
import UsersIndex from './components/users/Index';
import UsersShow from './components/users/Show';
import UsersEdit from './components/users/Edit';

// Image Components
import ImagesShow from './components/images/Show';

// Styles
import 'bulma/css/bulma.css';
import './scss/style.scss'; // TODO: needs to change when Heroku-ing

class App extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route exact path="/login" component={AuthLogin} />
          <Route exact path="/register" component={AuthRegister} />
          <Route exact path="/users" component={UsersIndex} />
          <Route exact path="/users/:id/edit" component={UsersEdit} />
          <Route exact path="/users/:id" component={UsersShow} />
          <Route exact path="/images/:id" component={ImagesShow} />
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
