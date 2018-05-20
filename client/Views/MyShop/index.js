import React, {Component} from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from "material-ui/TextField";
import Card from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import bigg from 'SharedStyles/bigg.jpg';
import Button from 'Components/Button';
import FlatButton from 'material-ui/FlatButton';
import { DialogAlert } from 'Components/DialogAlert/index';
import { Link } from 'react-router';
import { getShop, onDel, onPass } from './actions';
import * as styles from './styles.css'
class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            delOpen: false,
            passOpen: false,
            id: '',
            delid: '',
            passid: '',
            nopass: ''
        }
    }
    componentDidMount() {
       const {onDel, onPass} = this.props;
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
    onNoPass(shopId, nopassStr) { 
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
            "shopId": shopId,
            "ression": nopassStr,
        }
        let url = "/api/shop/nopass";
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
    nopassOpen = (id) => {
        this.setState({
          open: true,
          id: id
        });
    };
    nopassClose = () => {
        this.setState({open: false});
    };
    passOpen = (id) => {
        this.setState({
          passOpen: true,
          passid: id
        });
    };
    passClose = () => {
        this.setState({passOpen: false});
    };
    delOpen = (id) => {
        console.log('delopen');
        this.setState({
          delOpen: true,
          delid: id
        });
    };
    delClose = () => {
        this.setState({delOpen: false});
    };
    render() {
        const { shop, user } = this.props;
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
                this.onNoPass(this.state.id, this.state.nopass)  
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
        const delactions = [
            <FlatButton
              label="取消"
              primary={true}
              onClick={this.delClose}
            />,
            <FlatButton
              label="确定"
              primary={true}
              keyboardFocused={true}
              onClick={() => {
                this.delClose();
                this.props.onDel(this.state.delid)
              }}
            />,
        ];
        if(user.fetchingUser && user.type === '1') {
            if(shop.fetchingShop && shop.shop.result !== null) {
                return (
                    <div>
                        <MuiThemeProvider>
                        <Card style={{
                            marginTop: "50px",
                            width: "400px",
                            marginLeft: '280px',
                            padding: '20px 50px'
                        }}>
                            <p style={{margin:'10px 10px'}}>店铺名称:&nbsp;&nbsp;{shop.shop.result.result[0].name}</p>
                            <p style={{margin:'10px 10px'}}>法人名称:&nbsp;&nbsp;{shop.shop.result.result[0].corporation}</p>
                            <p style={{margin:'10px 10px'}}>法人手机号:&nbsp;&nbsp;{shop.shop.result.result[0].tel}</p>
                            <p style={{margin:'10px 10px'}}>法人身份证号:&nbsp;&nbsp;{shop.shop.result.result[0].idcard}</p>
                            <p style={{margin:'10px 10px'}}>资质证号:&nbsp;&nbsp;{shop.shop.result.result[0].qualification}</p>
                            <p style={{margin:'10px 10px'}}>营业执照:&nbsp;&nbsp;<img src={"/build/uploadFiles/" + shop.shop.result.result[0].fileName} style={{
                                width:'80px',
                                height:'80px'
                              }}/></p>
                            <p style={{margin:'10px 10px'}}>状态:&nbsp;&nbsp;{this.changeStatus(shop.shop.result.result[0].status)}
                                {shop.shop.result.result[0].status === 1 && 
                                    <span>{'(' + shop.shop.result.result[0].statusError + ')'}</span>
                                }
                            </p>
                            <Link to={`/CreateShop/${shop.shop.result.result[0]._id}`}
                                    primary={true}
                                    style={{display:"inline-block", width: "120px", height:'37px', lineHeight:'37px', textAlign:"center", alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                            >编辑</Link>
                            <Button onClick={() => this.delOpen(shop.shop.result.result[0]._id)}
                                    primary={true}
                                    style={{width: "120px", height:'37px', alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff",  marginLeft:"10px"}}
                            >删除</Button>
                        </Card>
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                        <Dialog
                            actions={delactions}
                            modal={false}
                            open={this.state.delOpen}
                            >
                            确定删除吗？
                        </Dialog>
                        </MuiThemeProvider>
                    </div>
                    )
            } else {
                return(
                    <div style={{marginLeft: '280px', marginTop:"50px"}}>
                        <Link to='/CreateShop' className="btn btn-success square-btn-adjust" 
                            style={{display:'block', marginRight:'50px', width:'100px', marginTop:'20px'}}>创建店铺</Link>
                        <p style={{marginTop:'10px'}}>还没有店铺，快去创建吧~~~</p>
                    </div>
                );
            }
        } else if(user.fetchingUser && user.type === '2') {
            if(shop.fetchingShop && shop.shop.result !== null) {
                return (
                    <div style={{marginLeft: '270px', marginTop:"50px", borderTop:'1px dashed #C8C7C7',}}>
                    <table className="tabindex" style={{marginTop:'20px'}} width="100%" cellPadding="0" cellSpacing="0">
                  <thead> 
                  <tr>
                    <th style={{width:"10%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>店铺名称</div></th>
                    <th style={{width:"10%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>法人名称</div></th>
                    <th style={{width:"15%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>法人手机号</div></th>
                    <th style={{width:"15%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>法人身份证号</div></th>
                    <th style={{width:"15%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>资质证号</div></th>
                    <th style={{width:"8%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>营业执照</div></th>
                    <th style={{width:"10%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>状态</div></th>
                    <th style={{width:"17%", backgroundColor:"#f8f8f8", scope:"col"}}>操作</th>                                                                           
                  </tr>
                  </thead>
                  {shop.shop.result.result.map((item, idx) => (
                    <tbody style={{verticalAlign:'center'}}>
                        <tr key={idx} style={idx%2 === 0 ? {backgroundColor:'#fff'}: {backgroundColor:'#f8f8f8'}}>
                            <td>{item.name}</td>
                            <td>{item.corporation}</td>
                            <td>{item.tel}</td>
                            <td>{item.idcard}</td>
                            <td>{item.qualification}</td>
                            <td><img src={"/build/uploadFiles/" + item.fileName} style={{
                            width:'30px',
                            height:'30px'
                            }}/></td>
                            <td>{this.changeStatus(item.status)}</td>
                        {item.status === 0 && 
                            <td>
                            <Link onClick={(id) => this.passOpen(item._id)} style={{marginRight:'10px', display:'inline-block'}}>审核通过</Link>
                            <Link onClick={(id) => this.nopassOpen(item._id)}>审核不通过</Link>
                            </td>
                        }
                        {(item.status === 1 || item.status === 2) && 
                            <td>
                            <Link onClick={(id) => this.delOpen(item._id)}>删除</Link>
                            </td>
                        } 
                        </tr>
                        </tbody>
                    ))
                    }
                     </table>
                    <MuiThemeProvider>
                        <Dialog
                            actions={passactions}
                            modal={false}
                            open={this.state.passOpen}
                            >
                            确定审核通过吗？
                        </Dialog>
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <Dialog
                            actions={nopassactions}
                            modal={false}
                            open={this.state.open}
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
                    <MuiThemeProvider>
                        <Dialog
                            actions={delactions}
                            modal={false}
                            open={this.state.delOpen}
                            >
                            确定删除吗？
                        </Dialog>
                    </MuiThemeProvider>
                    </div>
                    )
            } else {
                return(
                    <div style={{marginLeft: '270px', marginTop:"20px"}}>
                        <p>没有数据呀~~~~</p>
                    </div>
                );
            }
        } else {
            return null;
        }
    }
}
export default connect(
    (state) => { return {
        shop: state.shop,
        user: state.user
    }; },
    (dispatch) => { return {
        onDel: (shopId) => { dispatch(onDel(shopId)); },
        onPass: (shopId) => { dispatch(onPass(shopId)); },
    }; }
)(Shop);