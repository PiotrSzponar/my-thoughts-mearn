import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewWindow from 'react-new-window';
import { Row, Col, Icon, Button } from 'antd';
import { loadUser } from '../../../actions/auth';

const Social = ({ loadUser }) => {
  const [openGoogle, setOpenGoogle] = useState(false);
  const [openFacebook, setOpenFacebook] = useState(false);

  const handleGoogleClick = () => {
    setOpenGoogle(true);
  };

  const handleFacebookClick = () => {
    setOpenFacebook(true);
  };

  const handleClose = () => {
    loadUser();
    setOpenGoogle(false);
    setOpenFacebook(false);
  };

  return (
    <Row>
      <Col sm={11} span={24}>
        <Button type="primary" block onClick={handleFacebookClick}>
          <Icon type="facebook" />
          Facebook
        </Button>
        {openFacebook && (
          <NewWindow
            url="/api/users/signup/facebook/"
            center="screen"
            onUnload={() => handleClose()}
          />
        )}
      </Col>
      <Col sm={2} span={24}>
        &nbsp;
      </Col>
      <Col sm={11} span={24}>
        <Button type="danger" block onClick={handleGoogleClick}>
          <Icon type="google" />
          Google
        </Button>
        {openGoogle && (
          <NewWindow
            url="/api/users/signup/google/"
            center="screen"
            onUnload={() => handleClose()}
          />
        )}
      </Col>
    </Row>
  );
};

Social.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { loadUser },
)(Social);
