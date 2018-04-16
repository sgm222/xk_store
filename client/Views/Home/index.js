import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import NavTop from 'Components/NavTop';
import NavSide from 'Components/NavSide';
import appLayout from 'SharedStyles/appLayout.css';
class Home extends Component {
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
      
    }; },
    (dispatch) => { return {
  
    }; }
  )(Home);

