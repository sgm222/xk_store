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

  // componentDidUpdate() {
  //   const {
  //     forums,
  //     params,
  //     currentForum,
  //     updateCurrentForum,
  //   } = this.props;

  //   let newCurrentForum = '';
  //   if (params.forum) newCurrentForum = params.forum;
  //   else if (forums) newCurrentForum = forums[0].forum_slug;

  //   // update current forum if necessery
  //   if (newCurrentForum !== currentForum) updateCurrentForum(newCurrentForum);
  // }

  render() {
    const { goods } = this.props;
    console.log(goods);
    if (goods.fetchingGoods) {
          let data = goods.goods.result;
          return (
            <div style={{marginLeft: '240px'}}>
              <Link to="/AddGoods" className="btn btn-success square-btn-adjust">增加商品</Link>
              <table>
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
                {data.result && data.result.map((item, idx) => (
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
                          <a>删除</a>
                          <a>编辑</a>
                        </td>
                    </tr>
                    </tbody>
                  ))
                }
              </table>
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
