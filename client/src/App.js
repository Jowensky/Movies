import React, { Component } from 'react';
import Home from './pages/Home'
import Display from './pages/Display';
import Favorites from './pages/Favorites'
import Search from './pages/Search';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import './styles/style.css'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/display" component={Display} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/search" component={Search} />
            <Route default component={Home} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
