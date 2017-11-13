import React, { Component } from 'react';
import Navbar from './Nav';
import Chat from './Chat';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <Chat />
      </div>
    );
  }
}

export default App;
