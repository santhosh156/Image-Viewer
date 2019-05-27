import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
  

class Login extends Component {

    constructor(){
        super();
        this.state = {
            username: '',
            usernameRequired: 'dispNone',
            loginPassword: "",
            loginPasswordRequired: "dispNone",
        }
    }

    render(){
        return(
            <div>
                <Header />
                <Card className="cardStyle">
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            Login
                        </Typography><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="username">Username </InputLabel>
                            <Input id="username" type="text"
                                username={this.state.username}
                                onChange={this.inputUserNameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="password">Password </InputLabel>
                            <Input id="password" type="text"
                                username={this.state.loginPassword}
                                onChange={this.loginPasswordRequired} />
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl><br /><br />
                    </CardContent>
                    
                </Card>               
            </div>
        )
    }

}

export default Login;