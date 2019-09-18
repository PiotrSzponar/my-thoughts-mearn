import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFound = () => {
  return (
    <Result
      style={{ padding: '0 0 30px 0' }}
      status="404"
      title="404 - Page Not Found!"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
