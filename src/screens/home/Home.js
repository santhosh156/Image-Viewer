import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './Home.css';
import Header from '../../common/header/Header';

class Home extends Component {

    render(){
        return(
            <div>
                <Header profileIcon="true"/>
                <div>
                    You are in home
                </div>
            </div>
        )
    }

}

export default Home;