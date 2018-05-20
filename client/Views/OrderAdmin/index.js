import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import appLayout from 'SharedStyles/appLayout.css';
import { Link } from 'react-router';
import { deleteById, fahuo } from './actions';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import bigg from 'SharedStyles/bigg.jpg';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Menu, Dropdown, Button } from 'antd';
import TextField from "material-ui/TextField";
import Drawer from 'material-ui/Drawer';
let nameTF, telTF, addressTF;
class OrderAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        priceopen: false,
        faopen: false,
        open: false,
        addressopen: false,
        _id: "",
        faId: "",
        addId: "",
        goodId: null,
        id: "", 
        addressId: "", 
        goodsId: "",
        price: "",
        name: "",
        tel: "",
        address: "",
        addressError:"",
        telError: "",
        nameError: ""
    }
  }
  componentDidMount(){
    const { deleteById, fahuo } = this.props;
    nameTF = this.refs.nameTF;
    telTF = this.refs.telTF;
    addressTF = this.refs.addressTF;
  }
  handleOpen = (_id) => {
    this.setState({open: true, _id: _id});
  };
  handleClose = () => {
    this.setState({open: false});
  };
  fahuoOpen = (_id, addressId, goodsId) => {
    this.setState({faopen: true, faId: _id, addId:addressId, goodId:goodsId});
  };
  fahuoClose = () => {
    this.setState({faopen: false});
  };
  getLocalTime = (nS) =>{
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
  } 
  handleToggle = () => this.setState({addressopen: !this.state.addressopen});
  checkfahuo(addressId, goodsId){
    const { address } = this.props;
    let tel = "";
    let text = "";
    if(address.fetchingAddress) { 
      tel = address.address.filter(item => addressId === item._id)[0].tel;
    }
    goodsId.map(item => {
        text = text + item.name + ",";
    })
    let url = '/api/order/fahuo';
    let body = {
        'text':text,
        'message': tel
    }
    fetch(url, {
        method:'post',
        url: url,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'withCredentials': true  
        },
    }).then(
        (response) => {
            console.log(response);
            return response.json();
        }
    ).then(
        // (json) => {
        //     if (json.result) {
        //         let result=json.result;
        //         if (result.redirect) {
        //             this.setState({open: true});
        //             setTimeout(function() {
        //                 window.location.href = result.redirect;
        //             },2000);
        //         }
        //         else {
        //             this.setState({failureOpen: true})
        //         }
        //     }
        // }
    ).catch(
        console.error('error')
    )
  }
  modifyPrice(){
    let url = '/api/order/modifyPrice';
    let body = {
        'orderId':this.state.id,
        'price': this.state.price
    }
    fetch(url, {
        method:'post',
        url: url,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'withCredentials': true  
        },
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
                    //this.setState({failureOpen: true})
                }
            }
        }
    ).catch(
        console.error('error')
    )
  }
  changeStatus = (status) => {
    switch (status) {
      case 0:
        return '待发货'
      case 1:
        return '已发货'
      case 2:
        return '已收货'
      case 3:
        return '以完成' 
      default:
        return '';
    }
  };
  changePrice = () => {
    this.setState({priceopen: true});
  }
  onAdd() {
    let nameStr = this.refs.nameTF.getValue();
    let telStr = this.refs.telTF.getValue();
    let addressStr = this.refs.addressTF.getValue();  
    let infoFinished = true;
    if (nameStr === "") {
        this.setState({
            nameError: "不能为空"
        });
        infoFinished = false;
    }
    if (telStr === "") {
        this.setState({
            telError: "不能为空"
        });
        infoFinished = false;
    }
    if (addressStr === "") {
        this.setState({
            addressError: "不能为空"
        });
        infoFinished = false;
    }
    if (!infoFinished) {
        return;
    }
    let body = {
        "name": nameStr,
        "tel": telStr,
        "address": addressStr
    }
    let url = `/api/address/Modifyaddress/${this.state.addressId}`;
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
    const { order, shop, user, address} = this.props;
    const fahuoactions = [
        <FlatButton
          label="取消"
          primary={true}
          onClick={this.fahuoClose}
        />,
        <FlatButton
          label="确定"
          primary={true}
          keyboardFocused={true}
          onClick={()=> {
            this.fahuoClose();
            this.checkfahuo(this.state.addId, this.state.goodId);
            this.props.fahuo(this.state.faId);
          }}
        />,
    ];
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
          onClick={()=> {
            this.handleClose();
            this.props.deleteById(this.state._id)
          }}
        />,
    ];
    const nopassactions = [
        <FlatButton
          label="取消"
          primary={true}
          onClick={() => {
            this.setState({priceopen: false})  
            }
          }
        />,
        <FlatButton
          label="确定"
          primary={true}
          keyboardFocused={true}
          onClick={() => {
            this.setState({priceopen: false})
            this.modifyPrice()  
            }
          }
        />,
    ];
    const menu = (
        <Menu>
          {user.fetchingUser && user.type === '2' && 
          <Menu.Item>
            <a onClick={() => {this.handleOpen(this.state.id)}} rel="noopener noreferrer">删除</a>
          </Menu.Item>
          }
          {user.fetchingUser && user.type === '1' && it.status === 0 && 
          <Menu.Item>
            <a onClick={() => {this.fahuoOpen(this.state.id, this.state.addressId, this.state.goodsId)}} rel="noopener noreferrer" href="">发货</a>
          </Menu.Item>
          }
          <Menu.Item>
            <a onClick={this.changePrice} rel="noopener noreferrer">修改金额</a>
          </Menu.Item>
          <Menu.Item>
            <a  onClick={this.handleToggle} rel="noopener noreferrer">修改收货地址</a>
          </Menu.Item>
        </Menu>
      );
    if(order.fetchingOrder) {
      return (
        <div style={{
            width:'1100px',
            margin:'30px auto'
          }}>
        <MuiThemeProvider>
        <List  style={{
            backgroundColor:'#eee',
            borderRadius:'2px',
            width:'800px',
            margin:'20px auto',
            padding:'10px 30px'
        }}>
            {order.order.map(it => (
                <div style={{marginBottom:'20px',borderBottom:'1px solid #d0cdcd',padding:'10px'}}>
                    <span style={{fontSize:'14px', marginRight:'50px'}}>订单号： {it._id}</span>
                    <span>{this.getLocalTime(it.time)}</span>
                    <span style={{display:'inline-block', marginLeft:'50px'}}>金额：{it.price}</span>
                    <span style={{
                        display:'inline-block',
                        marginLeft:'50px'
                    }}>
                    状态：{this.changeStatus(it.status)}</span>
                    <br></br>
                    {it.goodsId.map(item => (
                         <ListItem key={item._id}
                                style={{
                                height:'100px',
                                margin:'10px'
                                }}
                                leftAvatar={<Link to={`/Detail/${item._id}`}><Avatar style={{width:'80px',height:'80px'}} src={"/build/uploadFiles/" + item.fileName} /></Link>}
                                primaryText={
                                <div style={{marginLeft:'80px'}}>{item.name}</div>
                                }
                                secondaryText={
                                <div style={{marginLeft:'80px',marginTop:'20px'}}>
                                    <span style={{display:'inline-block', marginRight:'20px'}}>单价：{item.price}</span>
                                    {shop.fetchingShop && shop.shop.result && shop.shop.result.result.filter(its => item.shopId === its.userId).map(it => (
                                        <span>店铺：{it.name}</span>
                                    ))}
                                </div>
                                }
                            />
                    ))}
                    {address.fetchingAddress && address.address.filter(item => it.addressId === item._id).map(its  => (
                        <div>
                          <span>收货人：{its.name}</span>
                          <span style={{display:'inline-block', marginLeft:'50px'}}>电话：{its.tel}</span>
                          <span style={{display:'inline-block', marginLeft:'50px', marginRight:'80px'}}>地址：{its.address}</span>
                          <Dropdown overlay={menu} placement="topLeft">
                                <Button onClick={() => this.setState({
                                    id: it._id,
                                    addressId: its._id,
                                    goodsId: it.goodsId,
                                    price: it.price,
                                    name: its.name,
                                    tel: its.tel,
                                    address: its.address,
                                })}>操作</Button>
                          </Dropdown>
                        </div>
                    ))}
                </div>
            ))}
            </List>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                >
                确定删除订单吗？
            </Dialog>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <Dialog
                actions={fahuoactions}
                modal={false}
                open={this.state.faopen}
                >
                确定发货吗？
            </Dialog>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <Dialog
                actions={nopassactions}
                modal={false}
                open={this.state.priceopen}
                >
                <span>修改金额：&nbsp;&nbsp;</span>
                <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                            errorText={this.state.nopassError}
                            value={this.state.price || ""}
                            onChange={
                                (event, str) => {
                                    this.setState({price: str});
                                    if (this.state.nopassError !== "") {
                                        this.setState({
                                            nopassError: ""
                                        })
                                    }
                            }}
                            id="nopassTF"
                            ref="nopassTF"/> 
            </Dialog>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <Drawer width={260}  open={this.state.addressopen}>
                <div style={{margin:'20px 0 0 15px'}}>
                    <span>修改收货地址</span>
                    <div>收货人：</div>
                    <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                errorText={this.state.nameError}
                                value={this.state.name || ""}
                                onChange={
                                    (event, str) => {
                                        this.setState({name: str});
                                        if (this.state.nameError !== "") {
                                            this.setState({
                                                nameError: ""
                                            })
                                        }
                                }}
                                id="nameTF"
                                ref="nameTF"/> 
                    <div>电话：</div>
                    <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                errorText={this.state.telError}
                                value={this.state.tel || ""}
                                onChange={
                                    (event, str) => {
                                        this.setState({tel: str});
                                        if (this.state.telError !== "") {
                                            this.setState({
                                                telError: ""
                                            })
                                        }
                                }}
                                id="telTF"
                                ref="telTF"/> 
                     <div>地址：</div>
                    <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                errorText={this.state.addressError}
                                value={this.state.address || ""}
                                onChange={
                                    (event, str) => {
                                        this.setState({address: str});
                                        if (this.state.addressError !== "") {
                                            this.setState({
                                                addressError: ""
                                            })
                                        }
                                }}
                                id="addressTF"
                                ref="addressTF"/> 
                    <Button onClick={this.onAdd.bind(this)}
                                          primary={true}
                                          style={{width: "120px", alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                    >修改</Button>
                </div>
            </Drawer>
        </MuiThemeProvider>
        </div>
      );
    } else {
        return null;
    }
}
}

export default connect(
  (state) => { return {
    order: state.order,
    shop: state.shop,
    user: state.user,
    address: state.address,
  }; },
  (dispatch) => { return {
    deleteById: (id) => { dispatch(deleteById(id)); },
    fahuo: (id) => { dispatch(fahuo(id)); }
  }; }
)(OrderAdmin);
