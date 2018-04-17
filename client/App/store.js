import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from '../Views/SignIn/reducers';
import { feedReducer } from '../Views/Home/reducers';
import { goodsReducer } from '../Views/Goods/reducers';
import { vipsReducer } from '../Views/VIPAdmin/reducers';
import { goodsDetailReducer } from '../Views/Goods/detailreducers';
// root reducer for app
const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  goods: goodsReducer,
  vips: vipsReducer,
  goodsDetail: goodsDetailReducer
});

// dev tool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// application store
let store = createStore(
  rootReducer,
  /* preloaded state, */
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;
