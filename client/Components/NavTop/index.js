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
        const props = this.props.user;
        if(props.fetchingUser) {
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
                <div className={styles.logout}><a onClick={(e) => this.handleClick(e)} className="btn btn-success square-btn-adjust">Logout</a> </div>
            </nav>
            )
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
                <div className={styles.logout}><Link to='/SignUp' className="btn btn-success square-btn-adjust">SIGN UP</Link> </div>
                <div className={styles.logout}><Link to='/SignIn' className="btn btn-success square-btn-adjust">SIGN IN</Link> </div>   
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