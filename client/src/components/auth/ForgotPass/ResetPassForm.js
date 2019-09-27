import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import axios from 'axios';
import { Form, Input, Icon, Button } from 'antd';
import { setAlert } from '../../../actions/alert';

const ResetPass = ({ token, form, isLoading, stepCb, setAlert }) => {
  const [isReset, setIsReset] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);

  const sendReset = async ({ password, passwordConfirm }, resetToken) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ password, passwordConfirm });

    isLoading(true);

    try {
      const res = await axios.patch(
        `/api/users/reset-password/${resetToken}`,
        body,
        config,
      );

      isLoading(false);
      setAlert(res.data.message, 'success');
      setIsReset(true);
    } catch (err) {
      const errors = err.response.data.message.split('\n');
      errors.forEach(error => setAlert(error, 'fail'));

      isLoading(false);
      stepCb(0);
    }
  };

  if (isReset) {
    return <Redirect to="/signin" />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        sendReset(values, token);
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
    <Form onSubmit={handleSubmit}>
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
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
};

ResetPass.propTypes = {
  form: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoading: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  stepCb: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const ResetPassForm = Form.create({ name: 'reset-pass' })(ResetPass);

export default connect(
  null,
  { setAlert },
)(ResetPassForm);
