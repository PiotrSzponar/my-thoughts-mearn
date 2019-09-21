import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Row,
  Col,
  Divider,
  Card,
  Form,
  Icon,
  Typography,
  Spin,
  Input,
  Button,
} from 'antd';
import { setAlert } from '../../../actions/alert';
import ResultMsg from '../../layout/ResultMsg';

const { Title, Text } = Typography;

const ResendVerificationForm = ({ form, isAuth, authLoading, setAlert }) => {
  const [verificationSend, setVerificationSend] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuth) {
    return <Redirect to="/feed" />;
  }

  const sendVerification = async ({ email }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email });

    setLoading(true);

    try {
      await axios.post('/api/users/resend-verification', body, config);

      setLoading(false);
      setVerificationSend(true);
    } catch (err) {
      const errors = err.response.data.message.split('\n');
      errors.forEach(error => {
        setAlert(error, 'fail', 5000);
      });

      setLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        sendVerification(values);
      }
    });
  };

  return (
    <Spin spinning={loading || authLoading}>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
          <Card>
            {verificationSend ? (
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
              <>
                <Title level={2}>
                  <Icon type="login" /> Resend Verification
                </Title>
                <Text>
                  Enter your E-mail and we will send you another message with
                  verification link.
                </Text>
                <Divider />
                <Form onSubmit={handleSubmit}>
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
                        prefix={
                          <Icon
                            type="mail"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="Your e-mail"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button type="primary" block htmlType="submit">
                      Send verification link
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

ResendVerificationForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.func).isRequired,
  isAuth: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const ResendVerification = Form.create({ name: 'signin' })(
  ResendVerificationForm,
);

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  authLoading: state.auth.loading,
});

export default connect(
  mapStateToProps,
  { setAlert },
)(ResendVerification);
