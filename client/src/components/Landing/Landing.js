import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, Icon, Button } from 'antd';
import styles from './Landing.module.scss';

const { Title } = Typography;

const Landing = () => {
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

export default Landing;
