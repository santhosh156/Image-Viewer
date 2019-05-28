import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header';

class Profile extends Component {

    render(){
        return(
            <div>
                <Header profileIcon="true"/>
                <div>
                    You are in profile page
                </div>
            </div>
        )
    }

}

export default Profile;