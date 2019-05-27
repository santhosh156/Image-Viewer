import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import Header from '../../common/header/Header';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Login extends Component {

    render(){
        return(
            <div>
                <Header />
            </div>
        )
    }

}

export default Login;