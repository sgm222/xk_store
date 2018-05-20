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
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
class VIPAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectopen: false,
        remarkopen: false,
        open: false,
        _id: "",
        userId: "",
        level: ""
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
  handleSelectChange = event => {
    this.setState({ level: event.target.value });
  };

  handleSelectClose = () => {
    this.setState({ selectopen: false });
  };

  handleSelectOpen = () => {
    this.setState({ selectopen: true });
  };
  remarkOpen = (_id, level) => {
    this.setState({remarkopen: true, userId: _id, level: level});
  };
  remarkClose = () => {
    this.setState({remarkopen: false});
  };
  changeLevel = (status) => {
    switch (status) {
      case 1:
        return 'VIP1'
      case 2:
        return 'VIP2'
      case 3:
        return 'VIP3'
      case 4:
        return 'VIP4' 
      case 5:
        return 'VIP5' 
      default:
        return '';
    }
  };
  changeYouhui = (status) => {
    switch (status) {
      case 1:
        return '无优惠'
      case 2:
        return '享所有商品9.9折'
      case 3:
        return '享所有商品9.8折'
      case 4:
        return '享所有商品9.5折' 
      case 5:
        return '享所有商品9折' 
      default:
        return '';
    }
  };
  changeName(e) {
    this.setState({
        level: e.target.value,
    })
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
  onRemark(userId, level) { 
    let infoFinished = true;
    let body = {
        "userId": userId,
        "level": level,
    }
    let url = "/api/user/modifyLevel";
    fetch(url, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'     
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
       console.error('error')
    )
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
    const remarkactions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={this.remarkClose}
      />,
      <FlatButton
        label="确定"
        primary={true}
        keyboardFocused={true}
        onClick={()=> {
          this.remarkClose();
          this.onRemark(this.state.userId, this.state.level)
        }}
      />,
    ];
    if (vips.fetchingVIP) {
          let data = vips.vips;
          return (
            <div style={{marginLeft: '280px', marginTop:"50px", borderTop: '1px dashed #c8c7c7'}}>
              {data.error && 
                  <span style={{marginTop:"20px", display:"block"}}>{data.error.errorMsg}</span>
                }
              {data.result && 
              <MuiThemeProvider>
              <List  style={{backgroundColor:'#fff',  width:'900px',float:'left'}}>
                {data.result.result.map((item, idx) => (
                  <ListItem key={idx}
                    style={{
                      height:'120px',
                      margin:'10px',
                      backgroundColor:'#eee',
                      borderRadius:'4px',
                      float:'left',
                      width:'400px'
                    }}
                    leftAvatar={<Avatar style={{width:'80px', height:'80px'}} src={"build/uploadFiles/" + item.fileName}/>}
                    primaryText={
                      <div style={{marginLeft:'60px'}}>
                          <span style={{display:'inline-block', marginRight:'20px'}}>会员Id：{item.userName}</span>
                          <a onClick={() => this.handleOpen(item._id)} style={{display:'inline-block', float:'right', marginRight:'20px'}}>删除</a>
                      </div>
                    }
                    secondaryText={
                      <div style={{marginTop:'10px', marginLeft:'60px', height:'46px'}}>
                          <span style={{display:'inline-block', marginRight:'40px'}}>会员等级：<span className="red_numb">{this.changeLevel(item.level)}</span></span>
                          <a onClick={() => this.remarkOpen(item._id, item.level)} style={{display:'inline-block', float:'right', marginRight:'10px'}}>等级修改</a>
                          <p style={{marginTop:'10px', fontSize:'14px'}}>优惠：{this.changeYouhui(item.level)}</p>
                      </div>
                    }
                    secondaryTextLines={2}
                  />
                ))}
              </List>
            </MuiThemeProvider>  
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
            <MuiThemeProvider>
                <Dialog
                  actions={remarkactions}
                  modal={false}
                  open={this.state.remarkopen}
                >
                  <span>等级修改：</span>
                  <select value={this.state.level}
                        ref="typeTF"
                        style={{
                            width: '256px',
                            height: '32px',
                            borderColor: '#e0e0e0',
                            margin: '10px 0px'
                        }}
                        onChange={this.changeName.bind(this)}
                >
                  <option value={1}>VIP1</option>
                  <option value={2}>VIP2</option>
                  <option value={3}>VIP3</option>
                  <option value={4}>VIP4</option>
                  <option value={5}>VIP5</option>
                </select>
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
