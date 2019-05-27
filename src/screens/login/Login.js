import React, {Component} from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        marginLeft: 500,
        marginTop: 20,
        minWidth: 500,
        maxWidth: 500,
    },
    formControl: {
        paddingLeft: 50,
     },
     title: {
        fontSize: 20,
     }
});

class Login extends Component {
    render() {
        const { classes } = this.props;
        return(
            <div>
                <Header />
                <div className={classes.card}>
                    <Card >
                        <CardContent>
                            <FormControl className={classes.formControl}>
                                <Typography className={classes.title} style={{fontWeight: 'inherit'}}>
                                    LOGIN
                                </Typography>
                            </FormControl>
                            <br /> <br />

                            <FormControl className={classes.formControl} required>
                                <InputLabel htmlFor="username" style={{paddingLeft: 50, paddingRight: 50}}>Username</InputLabel>
                                <Input id="username" type="text" style={{width: 350}}/>
                            </FormControl>
                            <br /> <br />

                            <FormControl className={classes.formControl} required>
                            <InputLabel htmlFor="loginpassword" style={{paddingLeft: 50, paddingRight: 50}}>Password</InputLabel>
                            <Input id="loginpassword" type="password" style={{width: 350}}/>
                            <br /> <br />

                            <Button variant="contained" color="primary" style={{width: 10}} onClick={this.loginClickHandler}>LOGIN</Button>
                        </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Login);