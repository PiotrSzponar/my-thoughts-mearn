import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Typography, Icon, Button } from 'antd';
import styles from './Landing.module.scss';

const { Title } = Typography;

const Landing = ({ isAuth }) => {
  if (isAuth) {
    return <Redirect to="/feed" />;
  }

  return (
    <Row className={styles.bg} type="flex" justify="center" align="middle">
      <div className={styles.leadText}>
        <Title>
          <Icon type="bulb" /> <strong>My</strong>Thoughts
        </Title>
        <Title level={3}>Connect with friends and the world around you.</Title>
        <Row gutter={24} className={styles.buttons}>
          <Col span={11} offset={1}>
            <Link to="/signup">
              <Button type="primary" size="large" block>
                <Icon type="user" />
                Sign Up
              </Button>
            </Link>
          </Col>
          <Col span={11}>
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
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Landing);
