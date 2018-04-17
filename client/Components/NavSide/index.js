import {Link} from 'react-router';
import React, {Component} from 'react';
import {Menu, Icon, Button} from 'antd';
import { connect } from 'react-redux';
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
		const Item = Menu.Item,
			SubMenu = Menu.SubMenu,
            MenuItemGroup = Menu.ItemGroup;
        if(props.fetchingUser) {
		return (
			<nav className="navbar-default navbar-side" role="navigation">
            <div className="sidebar-collapse">
                {this.props.user.type === '1' && 
                    <ul className="nav">
                        <li className="text-center">
                            <img src={"/build/uploadFiles/" + this.props.user.fileName} className="user-image img-responsive"/>
                            <span className='user-span'>{this.props.user.userName}</span>
                        </li>
                        <li>
                            <Link  to=""><i className="fa fa-dashboard fa-3x"></i>我的店铺</Link>
                        </li>
                        <li>
                            <Link  to="/Goods"><i className="fa fa-desktop fa-3x"></i>商品管理</Link>
                        </li>
                        <li>
                            <Link  to="/Goods"><i className="fa fa-desktop fa-3x"></i>订单管理</Link>
                        </li>
                        <li>
                            <Link  to="/Goods"><i className="fa fa-desktop fa-3x"></i>数据统计</Link>
                        </li>
                    </ul>                    	
                }
                {this.props.user.type === '2' && 
                    <ul className="nav">
                        <li className="text-center">
                            <img src={"/build/uploadFiles/" + this.props.user.fileName} className="user-image img-responsive"/>
                            <span className='user-span'>管理员：{this.props.user.userName}</span>
                        </li>
                        <li>
                            <Link  to="/Goods"><i className="fa fa-dashboard fa-3x"></i>商品管理</Link>
                        </li>
                        <li>
                            <Link  to="/Users"><i className="fa fa-desktop fa-3x"></i>商户管理</Link>
                        </li>
                        <li>
                            <Link  to="/VipAdmin"><i className="fa fa-desktop fa-3x"></i>会员管理</Link>
                        </li>
                        <li>
                            <Link  to="/Users"><i className="fa fa-desktop fa-3x"></i>店铺管理</Link>
                        </li>
                        <li>
                            <Link  to="/Users"><i className="fa fa-desktop fa-3x"></i>订单管理</Link>
                        </li>
                        <li>
                            <Link  to="/Users"><i className="fa fa-desktop fa-3x"></i>数据统计</Link>
                        </li>
                    </ul>                    	
                } 
            </div>
        </nav>
        )
    } else {
        return null;
    }
	}
}
export default connect(
    (state) => { return {
        user: state.user,
      }; },
)(NavSide);