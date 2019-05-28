import React, { Component } from 'react';
import './Header.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withRouter} from 'react-router-dom';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));


 const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

class Header extends Component {

    // const [anchorEl, setAnchorEl] = React.useState(null);
    constructor() {
        super();
        // this.handleClose = this.handleClose.bind(this);
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
            },
            open: false,
            anchorEl: null,
        }
    }

    

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    handleClose = (purpose, e) => {
        if( purpose === 'profile'){
            this.props.history.push("/profile");
        } else if( purpose === 'logout') {
            sessionStorage.clear();
            this.props.history.push("/");
        } 
        this.setState({ anchorEl: null });
        
    };

    
    render() {  
        
        return(
            <div>
                <header className="app-header">
                    <div className="app-logo">Image Viewer</div>
                    {this.props.profileIcon === "true" && this.state.loggedIn ?
                        <div className="showprofile-icon">
                            <Avatar 
                                alt={this.state.userProfile.username} 
                                src={this.state.userProfile.profile_picture}  
                                className="avatar" 
                                onClick={this.handleClick}
                                aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"/>
                            <StyledMenu id="simple-menu" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this,'')}>

                                <StyledMenuItem onClick={this.handleClose.bind(this,'profile')}>
                                <ListItemText primary="Profile" />
                                </StyledMenuItem>
                                
                                <StyledMenuItem onClick={this.handleClose.bind(this, 'logout')}>
                                <ListItemText primary="Logout" />
                                </StyledMenuItem>
                            </StyledMenu>
                        </div> : ""}


                </header>
            </div>
        )
    }
}

export default withRouter(Header);