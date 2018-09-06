import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Components
import Header from './components/Header';

import 'bulma/css/bulma.css';
import './scss/style.scss'; // needs to change when Heroku-ing

class App extends React.Component {
  render() {
    return (
      <main>
        <Header />
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
