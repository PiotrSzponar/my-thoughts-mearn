import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { animateScroll as scroll } from 'react-scroll';
import { Divider, Form, Input, Icon, Button, Typography } from 'antd';
import { setAlert } from '../../../actions/alert';
import Social from '../Social/Social';

const { Title, Text } = Typography;

const Signup = ({ form, isCreated, isLoading, setAlert }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);

  const sendSignup = async ({ name, email, password, passwordConfirm }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password, passwordConfirm });

    isLoading(true);

    try {
      await axios.post('/api/users/signup', body, config);

      isCreated(true);
      isLoading(false);
    } catch (err) {
      const errors = err.response.data.message.split('\n');
      errors.forEach(error => setAlert(error, 'fail'));

      isCreated(false);
      isLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        sendSignup(values);
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  return (
    <>
      <Title level={2}>
        <Icon type="user" /> Create Your Account
      </Title>
      <Text>
        If you have one, just <Link to="/signin">Sign In!</Link>
      </Text>
      <Divider />
      <Form onSubmit={handleSubmit}>
        <Form.Item hasFeedback>
          {form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Your name"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {form.getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Your e-mail"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {form.getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  'Password should contain: min 8 characters, at least one lower and upper case letter, one number and one special character.',
              },
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {form.getFieldDecorator('passwordConfirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input.Password
              onBlur={handleConfirmBlur}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Confirm password"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            block
            htmlType="submit"
            onClick={() => scroll.scrollToTop()}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <Divider>or get access with:</Divider>
      <Social />
    </>
  );
};

Signup.propTypes = {
  form: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoading: PropTypes.func.isRequired,
  isCreated: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const SignupForm = Form.create({ name: 'signup' })(Signup);

export default connect(
  null,
  { setAlert },
)(SignupForm);
