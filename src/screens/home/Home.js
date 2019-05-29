import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './Home.css';
import Header from '../../common/header/Header';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            profile_picture: '',
            username: '',
            media: 0,
            follows: 0,
            followed_by: 0,
            full_name: '',
            access_token: sessionStorage.getItem('access-token'),
        };

    }

    componentWillMount() {

        // Get user profile
        let dataUserProfile = null;
        let xhrUserProfile = new XMLHttpRequest();
        let that = this;
        xhrUserProfile.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log('profile',JSON.parse(this.responseText).data);
            const data = JSON.parse(this.responseText).data;
            that.setState({
                profile_picture: data.profile_picture,
                username: data.username,
                media: data.counts.media,
                follows: data.counts.follows,
                followed_by: data.counts.followed_by,
                full_name: data.full_name
            }); 
        }
        });
        xhrUserProfile.open("GET", this.props.baseUrl + "users/self/?access_token=" + this.state.access_token);
        xhrUserProfile.setRequestHeader("Cache-Control", "no-cache");
        xhrUserProfile.send(dataUserProfile);

    }

    render(){
        console.log('props Home user::', this.props.userprofile);
        return(
            <div>
                <Header profileIcon="true" profilePicture={this.state.profile_picture} profileUserName={this.state.username}/>
                <div>
                    You are in home
                </div>
            </div>
        )
    }

}

export default Home;