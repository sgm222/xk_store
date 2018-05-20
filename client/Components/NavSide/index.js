import {Link} from 'react-router';
import React, {Component} from 'react';
import {Menu, Icon, Button} from 'antd';
import { connect } from 'react-redux';
import { Calendar } from 'antd';
class NavSide extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		}
	}
	
	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	render() {
        const props = this.props.user;
        const { shop } = this.props;
		const Item = Menu.Item,
			SubMenu = Menu.SubMenu,
            MenuItemGroup = Menu.ItemGroup;
        if(props.fetchingUser) {
		return (
            <div>
                {this.props.user.type === '1' && 
                    <nav className="navbar-default navbar-side" role="navigation">
                    <a className="navbar-brand" style={{height:'60px',color:'#fff',lineHeight:'30px',fontSize:'20px'}} href="">小康电子商城管理系统</a> 
                        <div className="sidebar-collapse">
                            <ul className="nav">
                                <li className="text-center">
                                    <img src={"/build/uploadFiles/" + this.props.user.fileName} className="user-image img-responsive"/>
                                    <span className='user-span'>{this.props.user.userName}</span>
                                </li>
                                <li>
                                    <Link  to="/"><i className="fa fa-dashboard fa-3x"></i>首页</Link>
                                </li>
                                <li>
                                    <Link  to="/Shop"><i className="fa fa-dashboard fa-3x"></i>我的店铺</Link>
                                </li>
                                {shop.fetchingShop && shop.shop.result && shop.shop.result.result[0].status === 2 && 
                                    <li>
                                        <Link  to="/Goods"><i className="fa fa-desktop fa-3x"></i>商品管理</Link>
                                    </li>
                                }
                                {shop.fetchingShop && shop.shop.result && shop.shop.result.result[0].status === 2 &&
                                    <li>
                                        <Link  to="/Order"><i className="fa fa-desktop fa-3x"></i>订单管理</Link>
                                    </li>
                                }
                                {shop.fetchingShop && shop.shop.result && shop.shop.result.result[0].status === 2 &&
                                    <li>
                                        <Link  to="/SellerDA"><i className="fa fa-desktop fa-3x"></i>数据统计</Link>
                                    </li>
                                }
                            
                            </ul>  
                        </div>
                    </nav>                  	
                }
                {this.props.user.type === '2' &&
                    <div className="leftbar">
                        <div className="lm01"> <img src={"/build/uploadFiles/" + this.props.user.fileName} className="user-image img-responsive"/>
                            <div className="pepdet">
                                <p className="pepname">{this.props.user.userName}</p>
                                <p className="pepname">管理员</p>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="lm02">
                            <div className="title">
                                <img className="icon" src="/build/dataicon.jpg" />
                                <h2 style={{lineHeight: '32px',fontWeight: 700}}>日历</h2>
                            </div>
                            <div className="detail">
                                <div style={{ width: 240, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                                    <Calendar fullscreen={false}/>
                                </div>
                            </div>
                        </div>
                    </div>             	
                } 
            </div>
        )
    } else {
        return null;
    }
	}
}
export default connect(
    (state) => { return {
        user: state.user,
        shop: state.shop
      }; },
)(NavSide);