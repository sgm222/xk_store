import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from 'Containers/Header';
import Footer from 'Components/Footer';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getUser } from '../Views/SignIn/actions';
injectTapEventPlugin();
class AppContainer extends Component {
  componentDidMount() {
    const {
      getUser,
    } = this.props;

    getUser();
  }

  render() {
      console.log('app render');
      return (
        <div>
          <Helmet><title>ReForum</title></Helmet> 
          <Header />
            {this.props.children}
          <Footer />
        </div>
      );
  }
  }

  export default connect(
    (state) => { return {
      
    }; },
    (dispatch) => { return {
      getUser: () => { dispatch(getUser()); },
    }; }
  )(AppContainer);

