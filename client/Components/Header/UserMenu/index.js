import React, { Component } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import classnames from 'classnames';
import styles from './styles';
import Button from 'Components/Button';
import Avatar from 'material-ui/Avatar';
import Card from "material-ui/Card";
class UserMenu extends Component {
  constructor(props) {
    super(props);
  }
  SignOut() {
    console.log('signout');
    let url = "/api/user/SignOut";
    fetch(url, {
        method: "post",
        credentials: 'include'     //很重要，设置session,cookie可用
    }).then(
        (response) => {
            return response.json();
        }
    ).then(
        (json) => {
            if (json.redirect) {
                window.location = json.redirect;
            }
        }
    ).catch(
        (ex) => {
            console.error('parsing failed', ex);
        });
  }
  render() {
    const props = this.props;
    let avatarPath;
    let showAvatar = "none";
    if (props) {
        if (props.fileName) {
            avatarPath = "build/uploadFiles/" + props.fileName;
            showAvatar = "inline";
        }
    }
    if (props.fetchingUser) {
      return (
        <div className={styles.container}>
         <button className={styles.link} onClick={() => this.SignOut()}> SIGN OUT </button>
         <span>{props.userName}</span>
         <MuiThemeProvider>
         <Avatar src={avatarPath}
                style={{
                    display: showAvatar
                }}/>
        </MuiThemeProvider>
      </div>
      );
    }
    else {
      return (
        <div className={styles.container}>
          <Link className={styles.link} to={`/SignIn`}> SIGN IN </Link>
          <Link className={styles.link} to={`/SignUp`}> SIGN Up </Link>
        </div>
      );
    }
  }
}

export default UserMenu;
