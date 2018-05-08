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
import Button from 'Components/Button';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
class OrderAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        faopen: false,
        open: false,
        _id: "",
        faId: ""
    }
  }
  componentDidMount(){
      const { deleteById, fahuo } = this.props;
  }
  handleOpen = (_id) => {
    this.setState({open: true, _id: _id});
  };
  handleClose = () => {
    this.setState({open: false});
  };
  fahuoOpen = (_id) => {
    this.setState({faopen: true, faId: _id});
  };
  fahuoClose = () => {
    this.setState({faopen: false});
  };
  getLocalTime = (nS) =>{
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
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
  render() {
    const { order, shop, user} = this.props;
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
            this.props.fahuo(this.state.faId)
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
            width:'600px',
            margin:'20px auto',
            padding:'10px 30px'
        }}>
            {order.order.map(it => (
                <div style={{marginBottom:'20px',borderBottom:'1px solid #d0cdcd',padding:'10px'}}>
                    <span>{this.getLocalTime(it.time)}</span>
                    <span style={{display:'inline-block', marginLeft:'50px'}}>金额：{it.price}</span>
                    <span style={{
                        display:'inline-block',
                        marginLeft:'50px'
                    }}>
                    状态：{this.changeStatus(it.status)}</span>
                    {user.fetchingUser && user.type === '2' && 
                        <RaisedButton onClick={(e) => {this.handleOpen(it._id)}} label="删除" style={{marginLeft:'50px'}} />
                    }
                    {user.fetchingUser && user.type === '1' && it.status === 0 && 
                        <RaisedButton onClick={(e) => {this.fahuoOpen(it._id)}} label="发货" style={{marginLeft:'50px'}} />
                    }
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
    user: state.user
  }; },
  (dispatch) => { return {
    deleteById: (id) => { dispatch(deleteById(id)); },
    fahuo: (id) => { dispatch(fahuo(id)); }
  }; }
)(OrderAdmin);
