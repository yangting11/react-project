import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import {HashRouter, Route, Switch,Redirect} from 'react-router-dom'
import Login from './page/login/login.jsx'
import Home from './page/home/index.jsx'
import LayoutItem from './component/layout/index.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            {/* 
            
             */}
             <Route exact path="/login" component={Login}></Route>
             <Route path="/" render={(props=>(
                <LayoutItem>
                  <Switch>
                    <Route exact path="/home" component={Home}></Route>
                    <Redirect to="/login" component={Login}></Redirect>
                  </Switch>
                </LayoutItem>
             ))}>
             </Route>
             
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
