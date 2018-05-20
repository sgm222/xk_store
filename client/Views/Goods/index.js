import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import { Link } from 'react-router';
import { getGoods, onPass } from './actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from "material-ui/TextField";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        successOpen: false,
        failureOpen: false,
        nopassopen: false,
        passopen: false,
        _id: "",
        nopassid: "",
        passid: "",
        nopassError: "",
        nopass: ""
    }
  }
  componentDidMount() {
    const { onPass } = this.props;
  }
  changeStatus = (status) => {
    switch (status) {
      case 0:
        return '审核中'
      case 1:
        return '审核不通过'
      case 2:
        return '审核通过'
      default:
        return '';
    }
  };
  handleOpen = (_id) => {
    this.setState({
      open: true,
      _id: _id
    });
  };
  handleClose = () => {
    this.setState({open: false});
  };
  nopassOpen = (id) => {
    this.setState({
      nopassopen: true,
      nopassid: id
    });
  };
  nopassClose = () => {
      this.setState({nopassopen: false});
  };
  passOpen = (id) => {
      this.setState({
        passopen: true,
        passid: id
      });
  };
  passClose = () => {
      this.setState({passopen: false});
  };

  onNoPass(goodsId, nopassStr) { 
    let infoFinished = true;
    if (nopassStr === "") {
        this.setState({
            nopassError: "不能为空"
        });
        infoFinished = false;
    }
    if (!infoFinished) {
        return;
    }
    let body = {
        "goodsId": goodsId,
        "ression": nopassStr,
    }
    let url = "/api/goods/nopass";
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

  OnDelete = () => {
    this.setState({open: false});
    let url = "/api/goods/DeleteGoods";
    let body = {
      _id: this.state._id
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
                  this.setState({successOpen: true,});
                  setTimeout(function() {
                        window.location.href = result.redirect;
                  },3000);
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
    const { goods, user } = this.props;
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
    const nopassactions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={this.nopassClose}
      />,
      <FlatButton
        label="确定"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.nopassClose();
          this.onNoPass(this.state.nopassid, this.state.nopass)  
          }
        }
      />,
    ];
    const passactions = [
        <FlatButton
          label="取消"
          primary={true}
          onClick={this.passClose}
        />,
        <FlatButton
          label="确定"
          primary={true}
          keyboardFocused={true}
          onClick={() => {
            this.passClose();
            this.props.onPass(this.state.passid)
          }}
        />,
    ];
    if (goods.fetchingGoods) {
          let data = goods.goods;
          return (
            <div style={{marginLeft: '280px', marginTop:"20px"}}>
              <Link to="/AddGoods" className="btn btn-success square-btn-adjust" 
                    style={{display:'block', marginRight:'50px', width:'100px', marginTop:'20px'}}>增加商品</Link>
              {data.error && 
                  <span style={{marginTop:"20px", display:"block"}}>{data.error.errorMsg}</span>
              }
              {data.result &&
                <table className="tabindex" style={{marginTop:'20px'}} width="100%" cellPadding="0" cellSpacing="0">
                  <thead> 
                  <tr>
                    <th style={{width:"10%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>名称</div></th>
                    <th style={{width:"9%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>图片</div></th>
                    <th style={{width:"9%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>种类</div></th>
                    <th style={{width:"8%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>价格</div></th>
                    <th style={{width:"8%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>净重</div></th>
                    <th style={{width:"8%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>销量</div></th>
                    <th style={{width:"8%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>库存</div></th>
                    <th style={{width:"11%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>详情</div></th>
                    <th style={{width:"10%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>状态</div></th>
                    <th style={{width:"19%", backgroundColor:"#f8f8f8", scope:"col"}}>操作</th>
                  </tr>
                  </thead>
                {data.result.result.map((item, idx) => (
                  <tbody>
                    <tr style={idx%2 === 0 ? {backgroundColor:'#fff'}: {backgroundColor:'#f8f8f8'}} key={idx}>
                        <td>{item.name}</td>
                        <td><img src={"/build/uploadFiles/" + item.fileName} style={{
                          width:'30px',
                          height:'30px'
                        }}/></td>
                        <td>{item.type}</td>
                        <td>{item.price}</td>
                        <td>{item.weight}</td>
                        <td>{item.salecount}</td>
                        <td>{item.count}</td>
                        <td>{item.direction}</td>
                        <td>{this.changeStatus(item.status)}</td>
                        {user.fetchingUser && user.type === '1' &&
                          <td>
                            <Link onClick={(id) => this.handleOpen(item._id)}>删除</Link>
                            <Link to={`/AddGoods/${item._id}`} style={{marginLeft:'10px'}}>编辑</Link>
                          </td>
                        }
                        {user.fetchingUser && user.type === '2' && item.status === 0 && 
                            <td>
                            <Link onClick={(id) => this.passOpen(item._id)} style={{marginRight:'10px', display:'inline-block'}}>审核通过</Link>
                            <Link onClick={(id) => this.nopassOpen(item._id)}>审核不通过</Link>
                            </td>
                        }
                        {user.fetchingUser && user.type === '2' && (item.status === 1 || item.status === 2) && 
                            <td>
                              <Link onClick={(id) => this.handleOpen(item._id)}>删除</Link>
                            </td>
                        }
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
            <MuiThemeProvider>
              <Dialog
                modal={false}
                open={this.state.successOpen}
                >
                删除成功
              </Dialog>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <Dialog
                modal={false}
                open={this.state.failureOpen}
                >
                删除失败
              </Dialog>
            </MuiThemeProvider>
            <MuiThemeProvider>
                <Dialog
                    actions={passactions}
                    modal={false}
                    open={this.state.passopen}
                    >
                    确定审核通过吗？
                </Dialog>
            </MuiThemeProvider>
            <MuiThemeProvider>
                <Dialog
                    actions={nopassactions}
                    modal={false}
                    open={this.state.nopassopen}
                    >
                    <div>请填写审核不通过原因：</div>
                    <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                errorText={this.state.nopassError}
                                value={this.state.nopass || ""}
                                onChange={
                                    (event, str) => {
                                        this.setState({nopass: str});
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
    goods: state.goods,
    user: state.user
  }; },
  (dispatch) => { return {
    getGoods: () => { dispatch(getGoods()); },
    onPass: (goodsId) => { dispatch(onPass(goodsId)); },
  }; }
)(Goods);
