import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import { Link } from 'react-router';
import { getGoods } from './actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        successOpen: false,
        failureOpen: false,
        _id: ""
    }
  }
  componentDidMount() {
    const { getGoods } = this.props;
    getGoods();
  }
  handleOpen = (_id) => {
    this.setState({
      open: true,
      _id: _id
    });
  };
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
    const { goods } = this.props;
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
    if (goods.fetchingGoods) {
          let data = goods.goods;
          return (
            <div style={{marginLeft: '280px', marginTop:"20px"}}>
              <Link to="/AddGoods" className="btn btn-success square-btn-adjust" 
                    style={{display:'block', marginRight:'50px', width:'100px', marginTop:'20px'}}>增加商品</Link>
              {data.error && 
                  <span style={{marginTop:"20px", display:"block"}}>{data.error.errorMsg}</span>
                }
              {data.result && <table className={styles.table}>
                <thead>
                  <tr>
                    <th>名称</th>
                    <th>图片</th>
                    <th>种类</th>
                    <th>价格</th>
                    <th>净重</th>
                    <th>销量</th>
                    <th>库存</th>
                    <th>详情</th>
                    <th>操作</th>
                  </tr>
                </thead>
                {data.result.result.map((item, idx) => (
                  <tbody>
                    <tr key={idx}>
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
                        <td>
                          <Link onClick={(id) => this.handleOpen(item._id)}>删除</Link>
                          <Link to={`/AddGoods/${item._id}`} style={{marginLeft:'10px'}}>编辑</Link>
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
  }; },
  (dispatch) => { return {
    getGoods: () => { dispatch(getGoods()); },
  }; }
)(Goods);
