import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button } from 'antd';

const Social = () => {
  return (
    <Row gutter={24}>
      <Col xs={24} md={{ span: 9, offset: 2 }}>
        <Link to="/signup">
          <Button type="primary" block>
            <Icon type="facebook" />
            Facebook
          </Button>
        </Link>
      </Col>
      <Col xs={24} md={2}>
        &nbsp;
      </Col>
      <Col xs={24} md={9}>
        <Link to="/signin">
          <Button type="danger" block>
            <Icon type="google" />
            Google
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default Social;
