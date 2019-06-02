import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Create from '@material-ui/icons/Create';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

const styles = theme => ({
    bigAvatar: {
        margin: 10,
        width: 50,
        height: 50,
    },
    fab: {
        margin: 8,
    },
    paper: {
        position: 'absolute',
        width: 250,
        backgroundColor: 'white',
        padding: 16,
        outline: 'none',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    },
    paper_big: {
        position: 'absolute',
        width: 800,
        backgroundColor: 'white',
        padding: 16,
        outline: 'none',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    }
});

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_picture: '',
            username: '',
            media: 0,
            follows: 0,
            followed_by: 0,
            full_name: '',
            userPosts: null,
            access_token: sessionStorage.getItem('access-token'),
            editNameOpen: false,
            fullnameRequired: 'dispNone',
            editFullName: '',
            postItemOpen: false,
            selectedPost: null,
            selectedIndex: -1,
            addNewComment: ''
        };
    }

    /**
     * @description On component load - Get user profile and user posts
     */
    componentWillMount() {

        // Get user profile
        let dataUserProfile = null;
        let xhrUserProfile = new XMLHttpRequest();
        let that = this;
        xhrUserProfile.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
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
        //xhrUserProfile.setRequestHeader("Cache-Control", "no-cache");
        xhrUserProfile.send(dataUserProfile);


        // Get user posts
        let dataUserPosts = null;
        let xhrUserPosts = new XMLHttpRequest();
        xhrUserPosts.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const data = JSON.parse(this.responseText).data;
                that.setState({ userPosts: [...data] });
            }
        });
        xhrUserPosts.open("GET", this.props.baseUrl + "users/self/media/recent?access_token=" + this.state.access_token);
        //xhrUserPosts.setRequestHeader("Cache-Control", "no-cache");
        xhrUserPosts.send(dataUserPosts);

    }

    /**
     * @memberof Profile
     * @description To close edit full name modal and set values
     */
    handleEditNameClose = () => {
        this.setState({
            editNameOpen: false,
            fullnameRequired: 'dispNone'
        });
    }

    /**
     * @memberof Profile
     * @description To open edit full name modal and set values
     */
    handleEditNameOpen = () => {
        this.setState({
            editFullName: this.state.full_name,
            editNameOpen: true
        })
    }

    /**
     * @memberof Profile
     * @description Update user full name state  value and required field validation
     */
    updateNameClickHandler = () => {
        this.state.editFullName === '' ? this.setState({ fullnameRequired: 'dispBlock' }) : this.setState({ fullnameRequired: 'dispNone' });
        if (this.state.editFullName === '') {
            return;
        } else {
            this.setState({ full_name: this.state.editFullName, editNameOpen: false,
                fullnameRequired: 'dispNone' });
        }
    }

    /**
     * @memberof Profile
     * @description Set state full name on every changes in values
     */
    inputFullNameChangeHandler = (e) => {
        this.setState({ editFullName: e.target.value });
    }

    /**
     * @memberof Profile
     * @description On click of each post image  open modal with details
     * @param _id - selected item id(key)
     * @param _index - selected item array index
     */
    handlePostClickHandler = (_id, _index) => {
        let _userPostItems = this.state.userPosts;
        this.setState({
            selectedPost: _userPostItems[_index],
            selectedIndex: _index,
            postItemOpen: true,
            addNewComment: ''
        });
    }

    /**
     * @memberof Profile
     * @description Handle post details modal close event
     */
    handlePostItemClose = () => {
        this.setState({
            selectedPost: null,
            postItemOpen: false,
            selectedIndex: -1
        });
    }

    /**
     * @memberof Profile
     * @description like and unlike functionality 
     */
    likesClickHandler = () => {
        let _selectedPostItem = this.state.selectedPost;
        let _userPosts = this.state.userPosts;
        const _selectedIndex = this.state.selectedIndex;
        
        if (_selectedPostItem.user_has_liked) {
            _selectedPostItem.user_has_liked = false;
            _selectedPostItem.likes.count = (_selectedPostItem.likes.count) + 1;
        } else {
            _selectedPostItem.user_has_liked = true;
            _selectedPostItem.likes.count = (_selectedPostItem.likes.count) - 1;
        }

        _userPosts[_selectedIndex] = _selectedPostItem;

        this.setState({
            selectedPost: _selectedPostItem,
            userPosts: _userPosts
        });
    }

    /**
     * @memberof Profile
     * @description Set state addNewComment on value change
     */
    inputAddCommentChangeHandler = (e) => {
        this.setState({ addNewComment: e.target.value });
    }

    /**
     * @memberof Profile
     * @description Adding new comments to post
     */
    addCommentClickHandler = () => {

        if (this.state.addNewComment === "") {
            return;
        } else {
            let _selectedPostItem = this.state.selectedPost;
            console.log(_selectedPostItem)
            _selectedPostItem.comments['data'] = _selectedPostItem.comments['data'] || [];
            _selectedPostItem.comments['data'].push({
                id: (_selectedPostItem.comments['data'].length + 1) ,
                comment_by: this.state.username,
                comment_value: this.state.addNewComment
            });

            let _userPosts = this.state.userPosts;
            const _selectedIndex = this.state.selectedIndex;
            _userPosts[_selectedIndex] = _selectedPostItem;

            this.setState({
                selectedPost: _selectedPostItem,
                userPosts: _userPosts,
                addNewComment: ''
            });
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header profileIcon={true} profilePicture={this.state.profile_picture} profileUserName={this.state.username} />
                <Container fixed>
                    <Grid container spacing={3} justify="flex-start" alignItems="center" style={{'paddingTop':8 , 'paddingBottom':8}}>
                        <Grid item xs={4} className="avatar-grid">
                            <Avatar alt={this.state.username} src={this.state.profile_picture} className={classes.bigAvatar} />
                        </Grid>
                        <Grid item  xs={6}>
                            <Typography variant="h6" component="h6" style={{'paddingBottom':12}}>
                                {this.state.username}
                            </Typography>
                            <Grid container spacing={3} justify="space-between" alignItems="center">
                                <Grid item >
                                    <Typography variant="subtitle2">
                                        Posts: {this.state.media}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2">
                                        Follows: {this.state.follows}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2">
                                        Followed By: {this.state.followed_by}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} justify="flex-start" alignItems="center">
                                <Grid item >
                                    <Typography variant="h6">
                                        {this.state.full_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={this.handleEditNameOpen}>
                                        <Create />
                                    </Fab>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.editNameOpen}
                                        onClose={this.handleEditNameClose}
                                    >
                                        <div className={classes.paper}>
                                            <Typography variant="h6" id="modal-title" className="edit-fullname-modal-title">
                                                Edit
                                            </Typography>
                                            <FormControl required className="formControl">
                                                <InputLabel htmlFor="username">Full Name </InputLabel>
                                                <Input id="userfullname" type="text"
                                                    onChange={this.inputFullNameChangeHandler} value={this.state.editFullName} />
                                                <FormHelperText className={this.state.fullnameRequired}>
                                                    <span className="red">Required</span>
                                                </FormHelperText>
                                            </FormControl><br /><br />
                                            <Button variant="contained" color="primary" style={{ width: 10 }} onClick={this.updateNameClickHandler}>UPDATE</Button>
                                        </div>
                                    </Modal>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <GridList cellHeight={320} cols={3} >
                        {(this.state.userPosts || []).map((post, index) => (
                            <GridListTile key={post.id} className="grid-item" onClick={() => this.handlePostClickHandler(post.id, index)}>
                                <img src={post.images.standard_resolution.url} alt={post.caption.text} />
                            </GridListTile>
                        ))}

                    </GridList>
                    {this.state.selectedPost !== null ?
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.postItemOpen}
                            onClose={this.handlePostItemClose}
                        >
                            <div className={classes.paper_big}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <img src={this.state.selectedPost.images.standard_resolution.url} width="100%" alt={(this.state.selectedPost.caption.text).split('\n')[0]} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container spacing={3} justify="flex-start" alignItems="center" >
                                            <Grid item >
                                                <Avatar src={this.state.selectedPost.user.profile_picture} alt={this.state.selectedPost.user.username} />
                                            </Grid>
                                            <Grid item >
                                                <Typography variant="subtitle2">
                                                    {this.state.selectedPost.user.username}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider light />
                                        <Grid container spacing={3} justify="flex-start" alignItems="center">
                                            <Grid item >
                                                <Typography variant="caption">
                                                    {(this.state.selectedPost.caption.text).split('\n')[0]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3} justify="flex-start" alignItems="center">
                                            <Grid item >
                                                {(this.state.selectedPost.tags || []).map((tag, i) => {
                                                    return <Typography variant="caption" color="primary"> #{tag}</Typography>
                                                })}
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={1} justify="flex-start" alignItems="center">
                                            <Grid item className="comments-min-height">
                                                {(this.state.selectedPost.comments.data || []).map((comment, i) => {
                                                    return <Typography key={comment.id} variant="caption" display="block">
                                                        <strong>{comment.comment_by} :</strong> {comment.comment_value}
                                                    </Typography>
                                                })}
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={1} justify="flex-start" alignItems="center">
                                            <Grid item >
                                                {this.state.selectedPost.user_has_liked ? 
                                                        <FavoriteBorder className={'greyColor'} 
                                                                        onClick={this.likesClickHandler} 
                                                        />
                                                        :
                                                        <Favorite className={'redColor'} 
                                                                onClick={this.likesClickHandler} 
                                                        />                                                                                                       
                                                }   
                                            </Grid>
                                            <Grid item >
                                                <Typography variant="caption">
                                                    {(this.state.selectedPost.likes.count)} likes
                                               </Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} justify="flex-start" alignItems="center">
                                            <Grid item className="flex-grow-1">
                                                <FormControl className="formControl">
                                                    <InputLabel htmlFor="addcomment">Add a comment </InputLabel>
                                                    <Input id="addcomment" type="text" onChange={this.inputAddCommentChangeHandler} value={this.state.addNewComment} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary" onClick={this.addCommentClickHandler}>ADD</Button>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </div>
                        </Modal> : ""}
                </Container>
            </div>
        )
    }

}

export default withStyles(styles)(Profile);