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
ReactDOM.render (
  <Provider store={appStore}>
    {/* <Router history={browserHistory}>
      <Route path="/admin" component={AdminContainer}>
        <IndexRoute component={Dashboard} />
      </Route>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={ForumFeed} />
        <Route path=":forum" component={ForumFeed} />
        <Route path=":forum/discussion/:discussion" component={SingleDiscussion} />
        <Route path=":forum/new_discussion" component={NewDiscussion} />
        <Route path="user/:username" component={UserProfile} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router> */}
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="SignUp" component={SignUp}/>
            <Route path="SignIn" component={SignIn}/>
            {/* <Route path="UserCenter" component={UserCenter}/>
            <Route path="MyFollow" component={MyFollow}/>
            <Route path="WriteBlog" component={WriteBlog}/>
            <Route path="BlogDetail/:blogId" component={BlogDetail}/>
            <Route path="Settings" component={Settings}/>
            <Route path="Favorites" component={Favorites}/>
            <Route path="MyBlogs" component={MyBlogs}/> */} 
        </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
