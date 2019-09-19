import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'antd';
import ResultMsg from './ResultMsg';

const NotFound = () => (
  <Card style={{ maxWidth: 600, margin: '0 auto' }}>
    <ResultMsg
      status="404"
      title="404 - Page Not Found!"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  </Card>
);

export default NotFound;
