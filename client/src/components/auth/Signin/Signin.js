import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {
  Row,
  Col,
  Divider,
  Card,
  Form,
  Input,
  Icon,
  Button,
  Typography,
  Spin,
} from 'antd';
import { setAlert } from '../../../actions/alert';
import { loadUser } from '../../../actions/auth';
import Social from '../Social/Social';
import signin from '../../../img/signin.svg';

const { Title, Text } = Typography;

const SigninForm = ({
  form,
  isAuth,
  authLoading,
  match,
  setAlert,
  loadUser,
}) => {
  const { getFieldDecorator } = form;
  const [signinLoading, setSigninLoading] = useState(false);

  const sendSignin = async ({ email, password }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });

    setSigninLoading(true);

    try {
      const res = await axios.post('/api/users/signin', body, config);

      localStorage.setItem('token', res.data.token);
      setSigninLoading(false);
      loadUser();
    } catch (err) {
      const errors = err.response.data.message.split('\n');
      errors.forEach(error => {
        if (error !== 'Not verified') {
          setAlert(error, 'fail');
        } else {
          setAlert(error, 'fail', 15000);
        }
      });

      localStorage.removeItem('token');
      setSigninLoading(false);
    }
  };

  const sendVerification = useCallback(
    async token => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      setSigninLoading(true);

      try {
        const res = await axios.patch(
          `/api/users/verification/${token}`,
          config,
        );

        setSigninLoading(false);
        setAlert(res.data.message, 'success', 5000);
      } catch (err) {
        const errors = err.response.data.message.split('\n');
        errors.forEach(error => {
          setAlert(error, 'fail', 10000);
        });
        setSigninLoading(false);
      }
    },
    [setAlert],
  );

  useEffect(() => {
    if (match.path.includes('verification')) {
      sendVerification(match.params.token);
    }
  }, [match, sendVerification]);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        sendSignin(values);
      }
    });
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
        style={{ backgroundImage: `url(${signin})` }}
        className="col-img"
      />
      <Col xl={8} lg={10} md={12} span={24}>
        <Spin spinning={signinLoading || authLoading}>
          <Card>
            <Title level={2}>
              <Icon type="login" /> Sign In!
            </Title>
            <Text>
              Don&apos;t have an account? <Link to="/signup">Sign Up!</Link>
            </Text>
            <Divider />
            <Form onSubmit={handleSubmit}>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Your e-mail"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ],
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" block htmlType="submit">
                  Login
                </Button>
                <Link to="/forgot-password" style={{ float: 'right' }}>
                  Forgot password
                </Link>
              </Form.Item>
            </Form>
            <Divider>or get access with:</Divider>
            <Social />
          </Card>
        </Spin>
      </Col>
    </Row>
  );
};

SigninForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.func).isRequired,
  isAuth: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  setAlert: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const Signin = Form.create({ name: 'signin' })(SigninForm);

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  authLoading: state.auth.loading,
});

export default connect(
  mapStateToProps,
  { setAlert, loadUser },
)(Signin);
