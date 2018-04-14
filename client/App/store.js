import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from '../Views/SignIn/reducers';
import { feedReducer } from '../Views/Home/reducers';
import { singleDiscussionReducer } from '../Views/SingleDiscussion/reducers';
import { newDiscussionReducer } from '../Views/NewDiscussion/reducers';
import { adminInfoReducer } from '../Views/AdminDashboard/reducers';
import { userProfileReducer } from '../Views/UserProfile/reducers';

// root reducer for app
const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  discussion: singleDiscussionReducer,
  newDiscussion: newDiscussionReducer,
  adminInfo: adminInfoReducer,
  userProfile: userProfileReducer,
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
