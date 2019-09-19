import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Card, Button, Spin } from 'antd';
import { signupReset } from '../../../actions/signup';
import SignupForm from './SignupForm';
import ResultMsg from '../../layout/ResultMsg';

const Signup = ({ loading, userCreated, signupReset, isAuth }) => {
  if (isAuth) {
    return <Redirect to="/feed" />;
  }

  return (
    <Spin spinning={loading}>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
          <Card>
            {userCreated ? (
              <ResultMsg
                status="success"
                title="Great!"
                subTitle="An email confirmation has been sent to you. Please check your inbox and click the confirmation link."
                extra={[
                  <Link to="/" key="home">
                    <Button type="primary">Back Home</Button>
                  </Link>,
                  <Button onClick={signupReset} key="reset">
                    Sign Up another User
                  </Button>,
                ]}
              />
            ) : (
              <SignupForm />
            )}
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

Signup.propTypes = {
  loading: PropTypes.bool.isRequired,
  userCreated: PropTypes.bool.isRequired,
  signupReset: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.signup.loading,
  userCreated: state.signup.userCreated,
  isAuth: state.auth.isAuth,
});

export default connect(
  mapStateToProps,
  { signupReset },
)(Signup);
