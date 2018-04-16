import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import NavTop from 'Components/NavTop';
import NavSide from 'Components/NavSide';
import appLayout from 'SharedStyles/appLayout.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from "material-ui/TextField"
import Card from "material-ui/Card"
import Avatar from "material-ui/Avatar";
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import bigg from 'SharedStyles/bigg.jpg';
import Button from 'Components/Button';
import { getUser } from 'Views/SignIn/actions';
import { SIGNIN_NAMENULL } from 'Views/SignIn/constants';
import injectTapEventPlugin from 'react-tap-event-plugin';

let userNameTF;
let passTF;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nameError: "",
        passError: "",
        error: "",
        fetchingUser: false
    }
  }
  componentWillMount() {
    const {
      getUser,
    } = this.props;
    getUser();
  }
  render() {
        return (
          <div>
            <Helmet><title>小康电子商城</title></Helmet> 
              <div className="wrapper">
                <NavTop/>
                <NavSide/>
                <div className="content">
                    <div className="main-content">
                    {this.props.children}
                    </div>
                </div>
              </div>
          </div>
        );
      }
  }

  export default connect(
    (state) => { return {
      user: state.user,
    }; },
    (dispatch) => { return {
      getUser: () => { dispatch(getUser()); },
    }; }
  )(App);

