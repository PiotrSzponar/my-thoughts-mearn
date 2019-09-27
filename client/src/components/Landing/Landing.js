import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Typography, Icon, Button, Spin } from 'antd';
import chat from '../../img/chat.svg';
import styles from './Landing.module.scss';

const { Title } = Typography;

const Landing = ({ isAuth, isLoading }) => {
  if (isLoading) {
    return (
      <div className="spinWrapper">
        <Spin tip="Loading..." size="large" className="spin" />
      </div>
    );
  }

  if (isAuth) {
    return <Redirect to="/feed" />;
  }

  return (
    <Row className={styles.bg}>
      <div className={styles.leadText}>
        <Title>
          <Icon type="bulb" style={{ color: '#1890ff' }} /> <strong>My</strong>
          Thoughts
        </Title>
        <img src={chat} alt="thoughts" className={styles.img} />
        <Title level={3}>Connect with friends and the world around you.</Title>
        <Row className={styles.buttons}>
          <Col md={11}>
            <Link to="/signup">
              <Button type="primary" size="large" block>
                <Icon type="user" />
                Sign Up
              </Button>
            </Link>
          </Col>
          <Col md={1}>&nbsp;</Col>
          <Col md={11}>
            <Link to="/signin">
              <Button size="large" block>
                <Icon type="login" />
                Sign In
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </Row>
  );
};

Landing.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps)(Landing);
