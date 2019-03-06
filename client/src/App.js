import React, { Component } from 'react';
import Home from './pages/Home'
import style from './style/style.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home style={style} />
      </div>
    );
  }
}

export default App;
