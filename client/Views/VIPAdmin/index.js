import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import { Link } from 'react-router';
import { getVip } from './actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Avatar from 'material-ui/Avatar';

class VIPAdmin extends Component {
  componentDidMount() {
    const { getVip } = this.props;
    getVip();
  }

  render() {
    const { vips } = this.props;
    console.log(vips);
    if (vips.fetchingVIP) {
          let data = vips.vips;
          return (
            <div style={{marginLeft: '280px', marginTop:"50px"}}>
              {data.error && 
                  <span style={{marginTop:"20px", display:"block"}}>{data.error.errorMsg}</span>
                }
              {data.result && <table className={styles.table}>
                <thead>
                  <tr>
                    <th>会员名</th>
                    <th>会员等级</th>
                    <th>电话</th>
                    <th>头像</th>
                    <th>操作</th>
                  </tr>
                </thead>
                {data.result.result.map((item, idx) => (
                  <tbody>
                    <tr key={idx}>
                        <td>{item.userName}</td>
                        <td>普通会员</td>
                        <td>------</td>
                        <td>
                            <MuiThemeProvider>
                            <Avatar src={"build/uploadFiles/" + item.fileName}
                                    style={{
                                        display: "inline"
                                    }}/>
                            </MuiThemeProvider>
                        </td>
                        <td>
                          <Link >删除</Link>
                          <Link style={{marginLeft:'10px'}}>编辑</Link>
                        </td>
                    </tr>
                    </tbody>
                  ))
                }
              </table>
            }
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
    vips: state.vips,
  }; },
  (dispatch) => { return {
    getVip: () => { dispatch(getVip()); },
  }; }
)(VIPAdmin);
