import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import {HashRouter as Router, Route, Switch,Redirect} from 'react-router-dom'
import Login from './page/login/login.jsx'
import LayoutItem from './component/layout/index.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact to="/layout" component={LayoutItem}></Route>
            <Route exact to="/login" component={Login}></Route>
            <Redirect from="*" to="/login" component={Login}></Redirect>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
