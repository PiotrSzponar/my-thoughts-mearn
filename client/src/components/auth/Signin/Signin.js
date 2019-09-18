import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import Social from '../Social/Social';

const { Title, Text } = Typography;

const Signin = ({ form }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        setFormData(values);
      }
    });
  };

  return (
    <Row>
      <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
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
            </Form.Item>
          </Form>
          <Divider>OR</Divider>
          <Social />
        </Card>
      </Col>
    </Row>
  );
};

Signin.propTypes = {
  form: PropTypes.objectOf(PropTypes.func).isRequired,
};

const WrappedSignin = Form.create({ name: 'signin' })(Signin);

export default WrappedSignin;
