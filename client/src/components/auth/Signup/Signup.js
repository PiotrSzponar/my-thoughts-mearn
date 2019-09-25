import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Card, Button, Spin } from 'antd';
import SignupForm from './SignupForm';
import ResultMsg from '../../layout/ResultMsg';
import signup from '../../../img/signup.svg';

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
    <Row gutter={{ md: 48 }} className="flex-row">
      <Col
        xl={16}
        lg={14}
        md={12}
        span={24}
        style={{ backgroundImage: `url(${signup})` }}
        className="col-img"
      />
      <Col xl={8} lg={10} md={12} span={24}>
        <Spin spinning={loading || authLoading}>
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
        </Spin>
      </Col>
    </Row>
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
