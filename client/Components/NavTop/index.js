import React, {Component} from 'react';
import * as styles from './styles';
import { connect } from 'react-redux';
import { Link } from 'react-router';
class NavTop extends Component {
	constructor(props) {
        super(props);
    }
	handleClick = (e) => {
		e.preventDefault();
        let url = "/api/user/SignOut";
        fetch(url, {
            method: "post",
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                if (json.redirect) {
                    window.location = json.redirect;
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
	}

	static contextTypes = {
		router: React.PropTypes.object
	}

	render() {
        const { user } = this.props;
        if(user.fetchingUser) {
            if(user.type === '1') {
                return (
                <nav className="navbar navbar-default navbar-cls-top " role="navigation">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="">小康电子商城管理系统</a> 
                    </div>
                    <div style={{color: 'white',
                            padding: '15px 50px 5px 0px',
                            float: 'right',
                            fontSize: '16px'}}><a onClick={(e) => this.handleClick(e)} className="btn btn-success square-btn-adjust">Logout</a> </div>
                </nav>
                )
            } else if(user.type === '2') {
                return (
                    <div className="headerr">
                    <div className="top"> 
                        <a className="navbar-brand" style={{color:'#fff',padding:'15px 28px'}}>小康电子商城管理系统</a> 
                        <ul className="navheader">
                        <li className="seleli"><Link  to="/">首页</Link></li>
                        <li><Link  to="/Goods">商品管理</Link></li>
                        <li><Link  to="/Seller">商户管理</Link></li>
                        <li><Link  to="/Shop">店铺管理</Link></li>
                        <li><Link  to="/Vip">会员管理</Link></li>
                        <li><Link  to="/Order">订单管理</Link></li>
                        <li><Link  to="/DA">数据统计</Link></li>
                        </ul>
                        <div style={{color: 'white',
                            padding: '15px 50px 5px 0px',
                            float: 'right',
                            fontSize: '16px'}}>
                            <a onClick={(e) => this.handleClick(e)} style={{color:'#fff',fontSize: '16px'}}>Logout</a>
                        </div>
                    </div>
                    </div>
                )
            }
        } else {
            return (
                <nav className="navbar navbar-default navbar-cls-top " role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="">小康电子商城管理系统</a> 
                </div>
                <div style={{color: 'white',
                            padding: '15px 50px 5px 0px',
                            float: 'right',
                            fontSize: '16px'}}><Link to='/SignUp' className="btn btn-success square-btn-adjust">SIGN UP</Link> </div>
                <div style={{color: 'white',
                            padding: '15px 50px 5px 0px',
                            float: 'right',
                            fontSize: '16px'}}><Link to='/SignIn' className="btn btn-success square-btn-adjust">SIGN IN</Link> </div>   
            </nav>
            )
        }
	}
}

export default connect(
    (state) => { return {
        user: state.user,
      }; },
)(NavTop);