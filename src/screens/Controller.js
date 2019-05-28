import React, { Component } from 'react';
import Home from './home/Home';
import Login from './login/Login';
import Profile from './profile/Profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  PrivateRoute  from '../common/PrivateRoute';

class Controller extends Component {

  constructor()
  {
    super();
    // this.baseUrl = "http://54.255.154.11:8080/api/v1/";
    this.state = {
      loggedIn: sessionStorage.getItem('access-token') == null ? false : true
    }
  }

  render(){
    return(
      <Router>
         <div className="main-container">
           <Switch>
              <Route exact path='/' render={(props) => <Login {...props}/> }  />
              <PrivateRoute 
                  exact 
                  path='/home'
                  component={Home} 
                  render={(props) => (<Home {...props} /> )} /> 
              <PrivateRoute 
                exact 
                path='/profile' 
                component={Profile} 
                render={(props) => (<Profile {...props}/>)}   />
            </Switch>
        </div>
      </Router>

    )
  }
}

export default Controller;