import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
} from 'antd';
import { setAlert } from '../../../actions/alert';
import { signup } from '../../../actions/auth';
import Social from '../Social/Social';

const { Title, Text } = Typography;

const Signup = ({ form, setAlert, signup }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        signup(values);
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
    <Row>
      <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
        <Card>
          <Title level={2}>
            <Icon type="user" /> Create Your Account
          </Title>
          <Text>
            If you have one, just <Link to="/signin">Sign In!</Link>
          </Text>
          <Divider />
          <Form onSubmit={handleSubmit}>
            <Form.Item hasFeedback>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true,
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Your name"
                />,
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('email', {
                rules: [
                  {
                    // type: 'email',
                    // message: 'The input is not valid E-mail!',
                  },
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
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    // message:
                    // 'Password should contain: min 8 characters, at least one lower and upper case letter, one number and one special character.',
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
            <Form.Item hasFeedback>
              {getFieldDecorator('passwordConfirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    // validator: compareToFirstPassword,
                  },
                ],
              })(
                <Input.Password
                  onBlur={handleConfirmBlur}
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Confirm password"
                />,
              )}
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" block htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          <Divider>OR</Divider>
          <Social />
        </Card>
      </Col>
    </Row>
  );
};

Signup.propTypes = {
  form: PropTypes.objectOf(PropTypes.func).isRequired,
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
};

const WrappedSignup = Form.create({ name: 'signup' })(Signup);

export default connect(
  null,
  { setAlert, signup },
)(WrappedSignup);
