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
import VIPAdmin from '../Views/VIPAdmin';
import Seller from '../Views/SellerAdmin';
import CreateShop from '../Views/MyShop/createshop';
import Shop from '../Views/MyShop';
import OrderAdmin from '../Views/OrderAdmin';
import DA from '../Views/DA';
import SellerDA from '../Views/DA/sellerIndex';
ReactDOM.render (
  <Provider store={appStore}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="SignUp" component={SignUp}/>
            <Route path="SignIn" component={SignIn}/>
            <Route path="Goods" component={Goods}/>
            <Route path="AddGoods" component={AddGoods}/>
            <Route path="Vip" component={VIPAdmin}/>
            <Route path="AddGoods/:goodsId" component={AddGoods}/>
            <Route path="Seller" component={Seller}/>
            <Route path="CreateShop" component={CreateShop}/>
            <Route path="CreateShop/:shopId" component={CreateShop}/>
            <Route path="Shop" component={Shop}/>
            <Route path="Order" component={OrderAdmin}/>
            <Route path="DA" component={DA}/>
            <Route path="SellerDA" component={SellerDA}/>
        </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
