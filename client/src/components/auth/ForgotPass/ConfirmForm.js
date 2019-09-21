import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Input, Icon, Button } from 'antd';
import { setAlert } from '../../../actions/alert';

const Confirm = ({ form, isLoading, step, stepCb, setAlert }) => {
  const sendConfirm = async ({ email }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email });

    isLoading(true);

    try {
      const res = await axios.post('/api/users/forgot-password', body, config);

      localStorage.setItem('token', res.data.token);
      isLoading(false);
      stepCb(1);
    } catch (err) {
      const errors = err.response.data.message.split('\n');
      errors.forEach(error => {
        setAlert(error, 'fail', 5000);
      });

      isLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        sendConfirm(values);
      }
    });
  };

  return (
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
            disabled={step === 1}
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Your e-mail"
          />,
        )}
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" block htmlType="submit" disabled={step === 1}>
          Send confirmation link
        </Button>
      </Form.Item>
    </Form>
  );
};

Confirm.propTypes = {
  form: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoading: PropTypes.func.isRequired,
  stepCb: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const ConfirmForm = Form.create({ name: 'confirm' })(Confirm);

export default connect(
  null,
  { setAlert },
)(ConfirmForm);
