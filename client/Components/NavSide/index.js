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
                <ul className="nav" id="main-menu">
				<li className="text-center">
                    <img src={"/build/uploadFiles/" + this.props.user.fileName} className="user-image img-responsive"/>
					<span className='user-span'>{this.props.user.userName}</span>
                    </li>
                    <li>
                        <Link className="active-menu"  to=""><i className="fa fa-dashboard fa-3x"></i>我的店铺</Link>
                    </li>
                     <li>
                        <Link  to="/Goods"><i className="fa fa-desktop fa-3x"></i>商品管理</Link>
                    </li>
                    <li>
                        <a  href="tab-panel.html"><i className="fa fa-qrcode fa-3x"></i>订单管理</a>
                    </li>
						   <li  >
                        <a   href="chart.html"><i className="fa fa-bar-chart-o fa-3x"></i>商户管理</a>
                    </li>	
                      <li  >
                        <a  href="table.html"><i className="fa fa-table fa-3x"></i> Table Examples</a>
                    </li>
                    <li  >
                        <a  href="form.html"><i className="fa fa-edit fa-3x"></i> Forms </a>
                    </li>				
					 <li  >
                        <a   href="login.html"><i className="fa fa-bolt fa-3x"></i> Login</a>
                    </li>	
                     <li  >
                        <a   href="registeration.html"><i className="fa fa-laptop fa-3x"></i> Registeration</a>
                    </li>	
					                   
                    {/* <li>
                        <a href="#"><i className="fa fa-sitemap fa-3x"></i> Multi-Level Dropdown<span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level">
                            <li>
                                <a href="#">Second Level Link</a>
                            </li>
                            <li>
                                <a href="#">Second Level Link</a>
                            </li>
                            <li>
                                <a href="#">Second Level Link<span className="fa arrow"></span></a>
                                <ul className="nav nav-third-level">
                                    <li>
                                        <a href="#">Third Level Link</a>
                                    </li>
                                    <li>
                                        <a href="#">Third Level Link</a>
                                    </li>
                                    <li>
                                        <a href="#">Third Level Link</a>
                                    </li>

                                </ul>
                               
                            </li>
                        </ul>
                      </li>  
                  <li  >
                        <a  href="blank.html"><i className="fa fa-square-o fa-3x"></i> Blank Page</a>
                    </li>	 */}
                </ul>
               
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