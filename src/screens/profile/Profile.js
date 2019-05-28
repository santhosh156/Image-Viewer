import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Profile.css';
import Header from '../../common/header/Header';

class Profile extends Component {

    render(){
        return(
            <div>
                <Header />
                <div>
                    You are in profile page
                </div>
            </div>
        )
    }

}

export default Profile;