import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import { Link } from 'react-router';
import { getGoods } from './actions';

class Goods extends Component {
  componentDidMount() {
    const { getGoods } = this.props;
    getGoods();
  }

  render() {
    const { goods } = this.props;
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
                        <td>{item.type}</td>
                        <td>{item.price}</td>
                        <td>{item.weight}</td>
                        <td>{item.salecount}</td>
                        <td>{item.count}</td>
                        <td>{item.direction}</td>
                        <td>
                          <Link >删除</Link>
                          <Link to={`/AddGoods/${item._id}`} style={{marginLeft:'10px'}}>编辑</Link>
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
    goods: state.goods,
  }; },
  (dispatch) => { return {
    getGoods: (userId) => { dispatch(getGoods(userId)); },
  }; }
)(Goods);
