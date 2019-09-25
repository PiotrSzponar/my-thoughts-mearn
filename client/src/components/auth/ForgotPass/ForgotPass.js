import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {
  Row,
  Col,
  Divider,
  Card,
  Form,
  Icon,
  Typography,
  Spin,
  Steps,
} from 'antd';
import ConfirmForm from './ConfirmForm';
import ResetPassForm from './ResetPassForm';
import forgot from '../../../img/forgot.svg';

const { Title } = Typography;
const { Step } = Steps;

const ForgotPassForm = ({ isAuth, authLoading, match }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.path.includes('reset')) {
      setStep(2);
    }
  }, [match]);

  const sm = useMediaQuery({
    query: '(min-device-width: 576px)',
  });
  const md = useMediaQuery({
    query: '(min-device-width: 768px)',
  });
  const lg = useMediaQuery({
    query: '(min-device-width: 992px)',
  });

  if (isAuth) {
    return <Redirect to="/feed" />;
  }

  let stepsDirection;
  if (lg) {
    stepsDirection = 'horizontal';
  } else if (md) {
    stepsDirection = 'vertical';
  } else if (sm) {
    stepsDirection = 'horizontal';
  } else {
    stepsDirection = 'vertical';
  }

  const handleLoading = condition => {
    setLoading(condition);
  };

  const handleStep = condition => {
    setStep(condition);
  };

  return (
    <Row gutter={{ md: 48 }} className="flex-row">
      <Col
        xl={16}
        lg={14}
        md={12}
        span={24}
        style={{ backgroundImage: `url(${forgot})` }}
        className="col-img"
      />
      <Col xl={8} lg={10} md={12} span={24}>
        <Spin spinning={loading || authLoading}>
          <Card>
            <Title level={2}>
              <Icon type="login" /> Reset Password
            </Title>
            <Divider />
            <Steps size="small" direction={stepsDirection} current={step}>
              <Step
                title="Fill in the form"
                description="We will send you confirmation E-mail."
              />
              <Step
                title="Confirm E-mail"
                description="Check your inbox and enter the link."
              />
              <Step
                title="Reset Password"
                description="Done! Enter new password."
              />
            </Steps>
            <Divider />
            {step === 2 ? (
              <ResetPassForm
                isLoading={handleLoading}
                token={match.params.token}
                stepCb={handleStep}
              />
            ) : (
              <ConfirmForm
                isLoading={handleLoading}
                stepCb={handleStep}
                step={step}
              />
            )}
          </Card>
        </Spin>
      </Col>
    </Row>
  );
};

ForgotPassForm.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const ForgotPass = Form.create({ name: 'signin' })(ForgotPassForm);

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps)(ForgotPass);
