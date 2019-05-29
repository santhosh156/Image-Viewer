import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './Home.css';
import Header from '../../common/header/Header';
import Controller from '../Controller';
import imageData from '../../common/imageData';

class Home extends Component {

    componentWillMount() {
        /*let data = null;
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) 
            {
                console.log(this.responseText);
            }
        })

        xhr.open("GET", this.props.baseUrl + '?access_token=7782822137.e3496db.590fb6c5b7554ac0912cd4ffb0d94015');
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
        console.log(this.props);*/
    }

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