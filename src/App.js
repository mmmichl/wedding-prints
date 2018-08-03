import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <span className="name-plate">
              <img src={logo} className="App-logo" alt="logo" />
              Michael
          </span>
      </div>
    );
  }
}

export default App;
