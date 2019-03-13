import React, { Component } from 'react';
import Home from './pages/Home'
import style from './style/style.css'
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home style={style} />
      </Provider>
    );
  }
}

export default App;
