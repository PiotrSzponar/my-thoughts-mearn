import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar';
import Landing from './components/Landing/Landing';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
