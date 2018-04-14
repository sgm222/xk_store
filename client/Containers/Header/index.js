import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import appLayout from 'SharedStyles/appLayout';
import styles from './styles';

// components for Header
import UserMenu from 'Components/Header/UserMenu';
import Logo from 'Components/Header/Logo';
import NavigationBar from 'Components/Header/NavigationBar';
import PlaceholderImage from 'SharedStyles/placeholder.jpg';

class Header extends Component {
  render() {
    const {
      userName,
      fetchingUser,
      fileName
    } = this.props.user;
    
    return (
      <div className={classnames(appLayout.constraintWidth)}>
        <div className={styles.headerTop}>
          <Logo />
          <UserMenu
            fetchingUser={fetchingUser}
            userName={userName}
            fileName={fileName}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    user: state.user,
  }; }
)(Header);
