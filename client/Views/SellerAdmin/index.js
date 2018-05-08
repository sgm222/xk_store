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
import Dialog from 'material-ui/Dialog';
import bigg from 'SharedStyles/bigg.jpg';
import Button from 'Components/Button';
import FlatButton from 'material-ui/FlatButton';
class Seller extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        _id: ""
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
    const { seller, shop } = this.props;
    if (seller.fetchingSeller && shop.fetchingShop) {
          let data = seller.seller;
          return (
            <div style={{marginLeft: '280px', marginTop:"50px"}}>
              {data.error && 
                  <span style={{marginTop:"20px", display:"block"}}>{data.error.errorMsg}</span>
                }
              {data.result && <table className={styles.table}>
                <thead>
                  <tr>
                    <th>商户名</th>
                    <th>店铺名</th>
                    <th>电话</th>
                    <th>头像</th>
                    <th>操作</th>
                  </tr>
                </thead>
                {data.result.result.map((item, idx) => (
                  <tbody>
                    <tr key={idx}>
                        <td>{item.userName}</td>
                        <td>{shop.shop.result && shop.shop.result.result[idx].name}</td>
                        <td>{shop.shop.result && shop.shop.result.result[idx].tel}</td>
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
    seller: state.seller,
    shop: state.shop,
  }; },
  (dispatch) => { return {
    getSeller: () => { dispatch(getSeller()); },
    onDelShop: (id) => { dispatch(onDelShop(id)); },
  }; }
)(Seller);
