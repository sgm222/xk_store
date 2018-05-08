import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import { Link } from 'react-router';
import { getVip } from './actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import bigg from 'SharedStyles/bigg.jpg';
import Button from 'Components/Button';
import FlatButton from 'material-ui/FlatButton';
class VIPAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        _id: ""
    }
  }
  componentDidMount() {
    const { getVip } = this.props;
    getVip();
  }
  handleOpen = (_id) => {
    this.setState({
      open: true,
      _id: _id
    });
  };
  handleClose = () => {
    this.setState({open: false});
  };
  OnDelete = () => {
    this.setState({open: false});
    let url = "/api/user/delUser";
    let body = {
      userId: this.state._id
    };
    fetch(url, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'     //很重要，设置session,cookie可用
    }).then(
        (response) => {
            return response.json();
        }
    ).then(
        (json) => {
          if (json.result) {
            let result=json.result;
            if (result.redirect) {
                window.location.href = result.redirect;
            }
            else {
                // this.setState({failureOpen: true})
            }
        }
        }
    ).catch(
        (ex) => {
          this.setState({failureOpen: true,});
        });
  }
  render() {
    const { vips } = this.props;
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="确定"
        primary={true}
        keyboardFocused={true}
        onClick={this.OnDelete}
      />,
    ];
    if (vips.fetchingVIP) {
          let data = vips.vips;
          return (
            <div style={{marginLeft: '280px', marginTop:"50px"}}>
              {data.error && 
                  <span style={{marginTop:"20px", display:"block"}}>{data.error.errorMsg}</span>
                }
              {data.result && <table className={styles.table}>
                <thead>
                  <tr>
                    <th>会员名</th>
                    <th>会员等级</th>
                    <th>电话</th>
                    <th>头像</th>
                    <th>操作</th>
                  </tr>
                </thead>
                {data.result.result.map((item, idx) => (
                  <tbody>
                    <tr key={idx}>
                        <td>{item.userName}</td>
                        <td>普通会员</td>
                        <td>------</td>
                        <td>
                            <MuiThemeProvider>
                            <Avatar src={"build/uploadFiles/" + item.fileName}
                                    style={{
                                        display: "inline"
                                    }}/>
                            </MuiThemeProvider>
                        </td>
                        <td>
                        <Link onClick={(id) => this.handleOpen(item._id)}>删除</Link>
                        </td>
                    </tr>
                    </tbody>
                  ))
                }
              </table>
            }
            <MuiThemeProvider>
              <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                >
                确定删除吗？
              </Dialog>
            </MuiThemeProvider>
            </div>
          );
    }

    return (
      <div className={styles.loadingWrapper}>Loading...</div>
    );
  }
}

export default connect(
  (state) => { return {
    vips: state.vips,
  }; },
  (dispatch) => { return {
    getVip: () => { dispatch(getVip()); },
  }; }
)(VIPAdmin);
