import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


class Header extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            credentials : {
                username : 'admin',
                password : 'admin'
            },
            accessToken : '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784',
            userProfile: {
                id: '8661035776',
                username: 'upgrad_sde',
                profile_picture: 'https://scontent.cdninstagram.com/vp/a00d1efa0c39e2e35c26134689f21261/5D8A162A/t51.2885-19/s150x150/60113385_2304743493132057_1881074158138294272_n.jpg?_nc_ht=scontent.cdninstagram.com',
                full_name: 'upGrad SD Project',
                bio: 'Follow the official upGrad account: @upgrad_edu',
                website: 'https://www.upgrad.com/',
                is_business: false,
                counts: {
                    'media': 5,
                     'follows': 3,
                     'followed_by': 32
                    }
            }
        }
    }

    render() {
        return(
            <div>
                <header className="app-header">
                    <div className="app-logo">Image Viewer</div>
                    {this.props.profileIcon === "true" && this.state.loggedIn ?
                        <div className="showprofile-icon">
                            <Link to={"/profile" }>
                                <img src={this.state.userProfile.profile_picture} alt={this.state.userProfile.username} />
                            </Link>
                        </div> : ""}
                </header>
            </div>
        )
    }
}

export default Header;