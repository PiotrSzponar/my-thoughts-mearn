import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Routes from './components/routing/Routes';
import Landing from './components/Landing/Landing';
import CloseSocial from './components/auth/Social/CloseSocial';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signin/social/:token" component={CloseSocial} />
            <Route component={Routes} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
