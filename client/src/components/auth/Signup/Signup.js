import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Card, Button, Spin } from 'antd';
import SignupForm from './SignupForm';
import ResultMsg from '../../layout/ResultMsg';

const Signup = ({ isAuth, authLoading }) => {
  const [userCreated, setUserCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = condition => {
    setUserCreated(condition);
  };

  const handleLoading = condition => {
    setLoading(condition);
  };

  if (isAuth) {
    return <Redirect to="/feed" />;
  }

  return (
    <Spin spinning={loading || authLoading}>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
          <Card>
            {userCreated ? (
              <ResultMsg
                status="success"
                title="Great!"
                subTitle="An email confirmation has been sent to you. Please check your inbox and click the confirmation link."
                extra={
                  <Link to="/" key="home">
                    <Button type="primary">Back Home</Button>
                  </Link>
                }
              />
            ) : (
              <SignupForm isCreated={handleCreate} isLoading={handleLoading} />
            )}
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

Signup.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps)(Signup);
