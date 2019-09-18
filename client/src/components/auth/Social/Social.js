import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Row, Col, Icon, Button } from 'antd';

const Social = () => {
  const md = useMediaQuery({
    query: '(min-device-width: 768px)',
  });

  return (
    <Row gutter={24}>
      <Col
        xs={{ span: 24 }}
        md={{ span: 8, offset: 4 }}
        style={{ marginBottom: md ? 0 : 12 }}
      >
        <Link to="/signup">
          <Button type="primary" block>
            <Icon type="facebook" />
            Facebook
          </Button>
        </Link>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
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
