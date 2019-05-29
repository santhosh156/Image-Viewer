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
    this.baseUrl = "https://api.instagram.com/v1/users/self/";
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
                  render={(props) => (<Home {...props} baseUrl = {this.props.baseUrl}/> )} /> 
              <PrivateRoute 
                exact 
                path='/profile' 
                component={Profile} 
                render={(props) => (<Profile {...props} baseUrl = {this.props.baseUrl}/>)}   />
            </Switch>
        </div>
      </Router>

    )
  }
}

export default Controller;