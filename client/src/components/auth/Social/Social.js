import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewWindow from 'react-new-window';
import { Row, Col, Icon, Button } from 'antd';

const width = 600;
const height = 600;
const left = window.innerWidth / 2 - width / 2;
const top = window.innerHeight / 2 - height / 2;

const Social = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const newWindowUnloaded = () => {
    setOpen(false);
  };

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
        <Button type="danger" block onClick={handleClick}>
          <Icon type="google" />
          Google
        </Button>
        {open && (
          <NewWindow
            url="http://localhost:3000/api/users/signup/google/"
            center="screen"
            onUnload={() => newWindowUnloaded()}
          />
        )}
      </Col>
    </Row>
  );
};

export default Social;
