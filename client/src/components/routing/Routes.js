import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Layout, BackTop, Icon } from 'antd';
import Navbar from '../layout/Navbar/Navbar';
import NotFound from '../layout/NotFound';
import Alert from '../layout/Alert/AlertMsg';
import PrivateRoute from './PrivateRoute';
import Signup from '../auth/Signup/Signup';
import Signin from '../auth/Signin/Signin';
import ForgotPass from '../auth/ForgotPass/ForgotPass';
import ResendVerification from '../auth/ResendVerification/ResendVerification';
import Feed from '../Feed/Feed';
import Complete from '../users/Complete';

const { Content, Footer } = Layout;

const Routes = () => {
  const md = useMediaQuery({
    query: '(min-device-width: 768px)',
  });

  return (
    <>
      <Navbar />
      <Content
        style={{
          minHeight: md ? 'calc(100vh - 158px)' : 'calc(100vh - 138px)',
          padding: md ? '0 50px' : '0 10px',
          marginTop: md ? 89 : 74,
        }}
      >
        <Alert />
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/verification/:token" component={Signin} />
          <Route
            exact
            path="/resend-verification"
            component={ResendVerification}
          />
          <Route exact path="/forgot-password" component={ForgotPass} />
          <Route exact path="/reset-password/:token" component={ForgotPass} />
          <PrivateRoute exact path="/user/complete" component={Complete} />
          <PrivateRoute exact path="/feed" component={Feed} />
          <Route component={NotFound} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Icon type="bulb" />
        &nbsp;MyThoughts &copy;{new Date().getFullYear()}
      </Footer>
      <BackTop style={{ right: 25, bottom: 25 }} />
    </>
  );
};

export default Routes;
