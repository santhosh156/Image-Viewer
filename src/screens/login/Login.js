import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Home from '../home/Home';
  

class Login extends Component {

    
    constructor(){
        super();
        this.state = {
            username: '',
            usernameRequired: 'dispNone',
            password: '',
            passwordRequired: 'dispNone',
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            credentails : {
                username : 'admin',
                password : 'admin'
            },
            accessToken : '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784'
        }
    }

    loginClickHandler = () => {
        this.state.username === '' ? this.setState({ usernameRequired: 'dispBlock' }) : this.setState({ usernameRequired: 'dispNone' });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if (this.state.username === "" || this.state.password === "") { return }

        if(this.state.username === this.state.credentails.username && this.state.password === this.state.credentails.password){
            sessionStorage.setItem('access-token', this.state.accessToken);
            this.setState({ loggedIn: true });
            this.redirectToHome();
        }
    }

    redirectToHome = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }

    inputUserNameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }


    render(){
        return(
            <div>
                <Header />
                <Card className="cardStyle">
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            LOGIN
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
                            <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl><br /><br />

                        <Button variant="contained" color="primary" style={{width: 10}} onClick={this.loginClickHandler}>LOGIN</Button>
                    </CardContent>
                    
                </Card>               
            </div>
        )
    }

}

export default Login;