import React, { Component } from 'react';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import Profile from '../screens/profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {

  constructor()
  {
    super();
    this.baseUrl = "http://54.255.154.11:8080/api/v1/";
  }
  render(){
    return(
      <Router>
         <div className="main-container">
     	    <Route exact path='/' render={(props) => <Login {...props} /> }  />
            <Route path='/home' render={(props) => <Home {...props} /> } />
            <Route path='/profile' render={(props) => <Profile {...props}/> } />
        </div>
      </Router>

    )
  }
}

export default Controller;