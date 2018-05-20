import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import NavTop from 'Components/NavTop';
import NavSide from 'Components/NavSide';
import appLayout from 'SharedStyles/appLayout.css';
import { onPass } from '../Goods/actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from "material-ui/TextField";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { fahuo } from '../OrderAdmin/actions';
let oneTF, twoTF, oneliTF, twoliTF;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        successOpen: false,
        failureOpen: false,
        nopassopen: false,
        passopen: false,
        faopen: false,
        _id: "",
        nopassid: "",
        passid: "",
        nopassError: "",
        nopass: "",
        faId: "", 
        addId: "", 
        goodId: ""
    }
  }
  componentDidMount() {
    const { fahuo } = this.props;
  }
  oneclick() {
    oneTF = this.refs.oneTF;
    twoTF = this.refs.twoTF;
    oneliTF = this.refs.oneliTF;
    twoliTF = this.refs.twoliTF;
    oneTF.style.display = 'block';
    twoTF.style.display = 'none';
    oneliTF.className = 'currentBtn';
    twoliTF.className = ''
  }
  twoclick() {
    oneTF = this.refs.oneTF;
    twoTF = this.refs.twoTF;
    oneliTF = this.refs.oneliTF;
    twoliTF = this.refs.twoliTF;
    oneTF.style.display = 'none';
    twoTF.style.display = 'block';
    twoliTF.className = 'currentBtn';
    oneliTF.className = ''
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
  getLocalTime = (nS) =>{
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
  } 
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
  fahuoOpen = (_id, addressId, goodsId) => {
    this.setState({faopen: true, faId: _id, addId:addressId, goodId:goodsId});
  };
  fahuoClose = () => {
    this.setState({faopen: false});
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
  render() {
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
            this.props.onPass(this.state.passid);
          }}
        />,
    ];
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
      const {goods, shop, user, order} = this.props;
      let dealgoods = [], passgoods = [], dealshop = [], passshop = [] ,dealorder = [], goodsname = [];
      if(goods.fetchingGoods) {
        dealgoods = goods.goods.result.result.filter(item => item.status === 0);
        passgoods = goods.goods.result.result.filter(item => item.status === 2);
      }
      if(shop.fetchingShop && shop.shop.result) {
        dealshop = shop.shop.result.result.filter(item => item.status === 0);
        passshop = shop.shop.result.result.filter(item => item.status === 2);
      }
      if(order.fetchingOrder && order.order) {
        dealorder = order.order.filter(item => item.status === 0);
        dealorder.map(item => {
          let str = '';
          item.goodsId.map(it => {
            str = str + it.name + ' ';
          })
          goodsname.push(str);
        })
      }
      if(user.fetchingUser && user.type === '2') {
      return (
        <div className="mainbody">
          <div className="adtip">
            <div className="tipp">
              <p className="goom">Welcome，您好!</p>
              <p>您目前有<span>{dealgoods.length + dealshop.length}</span>条待办，<span>2</span>条通知！</p>
            </div>
            <div className="adv">
              <p>公司统一公告在这边展示</p>
              <span> x </span>
            </div>
          </div>
          <div className="rig_lm01">
            <div className="title"><img src="/build/listicon.jpg" className="icon" />
              <h2>通知</h2>
              <span className="red_numb">2</span></div>
              <div className="detail">
                <div className="dat01"> <span className="datti"><span>17</span> <br />
                <span className="jan">五月</span></span> 
                <span className="sqdeta">平台将进一步将强监管力度</span></div>
              <div className="dat02"> <span className="datti"><span>18</span> <br />
                <span className="jan">五月</span></span> 
                <span className="sqdeta">发货短信提醒功能已上线</span>
              </div>
            </div>
          </div>
      <div className="rig_lm03">
        <div className="title"><img src="/build/listicon.jpg" className="icon" />
          <h2>待办事项</h2>
        </div>
        <div className="detail">
          <div className="inner03">
            <div id="tabCot_product" className="zhutitab">
              <div className="tabContainer">
                <ul className="tabHead" id="tabCot_product-li-currentBtn-">
                  <li ref="oneliTF" className="currentBtn"><a onClick={this.oneclick.bind(this)} style={{color:'#000'}} title="绩效考核" rel="1">商品审核</a><span className="red_numb">{dealgoods.length}</span></li>
                  <li ref="twoliTF"><a onClick={this.twoclick.bind(this)} style={{color:'#000'}}  title="人事考核" rel="2">店铺审核</a><span className="red_numb">{dealshop.length}</span></li>
                </ul>
                <div className="clear"></div>
              </div>
              <div id="tabCot_product_1" ref="oneTF" className="tabCot" >
                {dealgoods.length > 0 && 
                <table className="tabindex" width="100%" cellPadding="0" cellSpacing="0">
                  <thead>
                  <tr>
                    <th style={{width:"13%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>名称</div></th>
                    <th style={{width:"7%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>图片</div></th>
                    <th style={{width:"7%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>种类</div></th>
                    <th style={{width:"7%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>价格</div></th>
                    <th style={{width:"7%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>净重</div></th>
                    <th style={{width:"7%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>销量</div></th>
                    <th style={{width:"7%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>库存</div></th>
                    <th style={{width:"12%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>详情</div></th>
                    <th style={{width:"12%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>状态</div></th>
                    <th style={{width:"21%", backgroundColor:"#f8f8f8", scope:"col"}}>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  {dealgoods.map((item,idx) => (
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
                        <td>{this.changeStatus(item.status)}</td>
                        <td>
                          <Link onClick={(id) => this.passOpen(item._id)} style={{ marginRight:'10px', display:'inline-block'}}>审核通过</Link>
                          <Link onClick={(id) => this.nopassOpen(item._id)}>审核不通过</Link>
                        </td>
                    </tr>
                  ))}
                  </tbody>
                </table>}
              </div>
              <div id="tabCot_product_2" ref="twoTF" className="tabCot" style={{display:'none'}}>
              {dealshop.length > 0 && 
               <table className="tabindex" width="100%" cellPadding="0" cellSpacing="0">
                  <thead> 
                  <tr>
                    <th style={{width:"12%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>店铺名称</div></th>
                    <th style={{width:"10%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>法人名称</div></th>
                    <th style={{width:"12%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>法人手机号</div></th>
                    <th style={{width:"12%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>法人身份证号</div></th>
                    <th style={{width:"12%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>资质证号</div></th>
                    <th style={{width:"12%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>营业执照</div></th>
                    <th style={{width:"10%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>状态</div></th>
                    <th style={{width:"20%", backgroundColor:"#f8f8f8", scope:"col"}}>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  {dealshop.map((item,idx) => (
                    <tr key={idx}>
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
                      <td>
                      <Link onClick={(id) => this.passOpen(item._id)} style={{marginRight:'10px', display:'inline-block'}}>审核通过</Link>
                      <Link onClick={(id) => this.nopassOpen(item._id)}>审核不通过</Link>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MuiThemeProvider>
          <Dialog
              actions={passactions}
              modal={false}
              open={this.state.passopen}
              >
              确定审核店铺通过吗？
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
    } else if(user.fetchingUser && user.type === '1') {
        return (
          <div className="mainbody">
            <div className="adtip">
              <div className="tipp">
                <p className="goom">Welcome，您好!</p>
                <p>您目前有<span>{dealorder.length}</span>条待办，<span>{passgoods.length + passshop.length}</span>条通知！</p>
              </div>
              <div className="adv">
                <p>公司统一公告在这边展示</p>
                <span> x </span>
              </div>
            </div>
            <div className="rig_lm01">
              <div className="title"><img src="/build/listicon.jpg" className="icon" />
                <h2>通知</h2>
                <span className="red_numb">{passgoods.length + passshop.length}</span>
              </div>
              <div className="detail">
                {passshop.map(item => (
                  <div className="dat01">
                    <span className="sqdeta">您的店铺【{item.name}】审核通过</span>
                  </div>
                ))}
                {passgoods.map(item => (
                  <div className="dat01">
                    <span className="sqdeta">您的商品【{item.name}】审核通过</span>
                  </div>
                ))}
                {/* <div className="dat01"> 
                  <span className="datti"><span>13</span> <br />
                  <span className="jan">五月</span></span> 
                  <span className="sqdeta">您的店铺审核通过</span>
                </div>
                <div className="dat02">
                  <span className="datti"><span>15</span> <br />
                  <span className="jan">五月</span></span> 
                  <span className="sqdeta">您的商品&nbsp;蓝莓&nbsp;审核通过</span>
                </div> */}
              </div>
            </div>
            <div className="rig_lm03">
              <div className="title"><img src="/build/listicon.jpg" className="icon" />
                <h2>待办事项</h2>
              </div>
              <div className="detail">
                <div className="inner03">
                  <div id="tabCot_product" className="zhutitab">
                    <div className="tabContainer">
                      <ul className="tabHead" id="tabCot_product-li-currentBtn-">
                        <li ref="oneliTF" className="currentBtn"><a  style={{color:'#000'}} title="待发货" rel="1">待发货</a><span className="red_numb">{dealorder.length}</span></li>
                      </ul>
                      <div className="clear"></div>
                    </div>
                    <div id="tabCot_product_1"  className="tabCot" >
                      {dealorder.length > 0 && 
                      <table className="tabindex" width="100%" cellPadding="0" cellSpacing="0">
                        <thead>
                          <tr>
                            <th style={{width:"20%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>时间</div></th>
                            <th style={{width:"20%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>订单编号</div></th>
                            <th style={{width:"20%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>购买商品</div></th>
                            <th style={{width:"20%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>金额</div></th>
                            <th style={{width:"20%", backgroundColor:"#f8f8f8", scope:"col"}}><div style={{textAlign:'center'}}>操作</div></th>
                          </tr>
                        </thead>
                        <tbody>
                        {dealorder.map((item,idx) => (
                          <tr key={idx}>
                              <td>{this.getLocalTime(item.time)}</td>
                              <td>{item._id}</td>
                              <td>{goodsname[idx]}</td>
                              <td>{item.price}</td>
                              <td>
                                <Link onClick={() => this.fahuoOpen(item._id, item.addressId, item.goodsId)}>发货</Link>
                              </td>
                          </tr>
                        ))}
                        </tbody>
                      </table>}
                    </div>
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
                </div>
              </div>
            </div>
          </div>
        );
    } else {
      return (
        <div style={{width:'800px', margin:'20px auto'}}>
          <img src="/build/back.jpg" />
        </div>
      );
    }
  }
  }

  export default connect(
    (state) => { return {
      goods: state.goods,
      shop: state.shop,
      user: state.user,
      order: state.order
    }; },
    (dispatch) => { return {
      onPass: (goodsId) => { dispatch(onPass(goodsId)); },
      fahuo: (id) => { dispatch(fahuo(id)); }
    }; }
  )(Home);

