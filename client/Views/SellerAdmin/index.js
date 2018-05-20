import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Avatar from 'material-ui/Avatar';
import { onDelShop } from '../MyShop/actions';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Dialog from 'material-ui/Dialog';
import bigg from 'SharedStyles/bigg.jpg';
import Button from 'Components/Button';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from "material-ui/TextField";
class Seller extends Component {
  constructor(props) {
    super(props);
    this.state = {
        remarkopen: false,
        open: false,
        levelError: "",
        _id: "",
        shopId: "",
        level: 0,
    }
  }
  componentDidMount() {
    const { getSeller, onDelShop } = this.props;
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
  remarkOpen = (_id, level) => {
    this.setState({remarkopen: true, shopId: _id, level: level});
  };
  remarkClose = () => {
    this.setState({remarkopen: false});
  };
  changeLevel = (status) => {
      if(status >= 4.8 && status <= 5.0) {
        return '高';
      } else if (status >= 4.5 && status < 4.8) {
        return '平';
      } else {
        return '低';
      }
  };
  OnDelete = () => {
    this.setState({open: false});
    let url = "/api/user/delSeller";
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
                if (result.success) {
                  this.props.onDelShop(this.state._id);
                }
                else {
                  this.setState({failureOpen: true,});
                }
            }
        }
    ).catch(
        (ex) => {
          this.setState({failureOpen: true,});
        });
  }
  onRemark(shopId, level) { 
    let infoFinished = true;
    if (level === "") {
        this.setState({
          levelError: "不能为空"
        });
        infoFinished = false;
    }
    if (!infoFinished) {
        return;
    }
    let body = {
        "shopId": shopId,
        "level": level,
    }
    let url = "/api/shop/modifyLevel";
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
          this.onRemark(this.state.shopId, this.state.level)
        }}
      />,
    ];
    const { seller, shop } = this.props;
    if (seller.fetchingSeller && shop.fetchingShop) {
          let data = seller.seller;
          return (
            <div style={{marginLeft: '280px', marginTop:"50px", borderTop:'1px dashed #C8C7C7',}}>
              {data.error && 
                  <span style={{marginTop:"20px", display:"block"}}>{data.error.errorMsg}</span>
                }
              {data.result && 
              <MuiThemeProvider>
                <List  style={{backgroundColor:'#fff',  width:'800px',float:'left'}}>
                  {data.result.result.map((item, idx) => (
                    <ListItem key={idx}
                      style={{
                        height:'100px',
                        margin:'10px',
                        backgroundColor:'#eee',
                        borderRadius:'4px'
                      }}
                      leftAvatar={<Avatar style={{width:'80px', height:'80px'}} src={"build/uploadFiles/" + item.fileName}/>}
                      primaryText={
                        <div style={{marginLeft:'60px'}}>
                            <span style={{display:'inline-block', marginRight:'20px'}}>{item.userName}</span>
                            <a onClick={() => this.handleOpen(item._id)} style={{display:'inline-block', float:'right', marginRight:'20px'}}>删除</a>
                        </div>
                      }
                      secondaryText={
                        <div style={{marginTop:'20px', marginLeft:'60px'}}>
                            <span style={{display:'inline-block', marginRight:'40px'}}>店铺名：{shop.shop.result && shop.shop.result.result[idx].name}</span>
                            <span style={{display:'inline-block', marginRight:'40px'}}>联系方式：{shop.shop.result && shop.shop.result.result[idx].tel}</span>
                            <span>商户/店铺评分：{shop.shop.result && shop.shop.result.result[idx].level}</span>
                            <span className="red_numb">{this.changeLevel(shop.shop.result.result[idx].level)}</span>
                            <a onClick={() => this.remarkOpen(shop.shop.result.result[idx]._id, shop.shop.result.result[idx].level)} style={{display:'inline-block', float:'right', marginRight:'10px'}}>评分修改</a>
                        </div>
                      }
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
                  <span>评分修改：</span>
                  <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                              errorText={this.state.levelError}
                              value={this.state.level || ""}
                              onChange={
                                  (event, str) => {
                                      this.setState({level: str});
                                      if (this.state.levelError !== "") {
                                          this.setState({
                                            levelError: ""
                                          })
                                      }
                              }}
                              id="remarkTF"
                              ref="remarkTF"/> 
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
    seller: state.seller,
    shop: state.shop,
  }; },
  (dispatch) => { return {
    getSeller: () => { dispatch(getSeller()); },
    onDelShop: (id) => { dispatch(onDelShop(id)); },
  }; }
)(Seller);
