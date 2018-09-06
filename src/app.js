import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import AuthLogin from './components/auth/Login';

import 'bulma/css/bulma.css';
import './scss/style.scss'; // needs to change when Heroku-ing

class App extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route exact path="/login" component={AuthLogin} />
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
