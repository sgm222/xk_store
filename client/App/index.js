import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import styles from './styles';

// app store
import appStore from './store';

// app views
import App from './App';
import SignIn from '../Views/SignIn';
import SignUp from '../Views/SignUp';
import Home from '../Views/Home';
import Goods from '../Views/Goods';
import AddGoods from '../Views/Goods/addgoods';
import Vips from '../Views/VIPAdmin';
ReactDOM.render (
  <Provider store={appStore}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="SignUp" component={SignUp}/>
            <Route path="SignIn" component={SignIn}/>
            <Route path="Goods" component={Goods}/>
            <Route path="AddGoods" component={AddGoods}/>
            <Route path="VipAdmin" component={Vips}/>
            <Route path="AddGoods/:goodsId" component={AddGoods}/>
        </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
