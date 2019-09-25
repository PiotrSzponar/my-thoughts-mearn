import React from 'react';
import { Skeleton, Card } from 'antd';

const FeedLoading = () => (
  <Card
    style={{ marginBottom: 24 }}
    title={<Skeleton active avatar={{ shape: 'circle' }} paragraph={false} />}
  >
    <Skeleton active title={false} paragraph={{ rows: 3 }} />
  </Card>
);

export default FeedLoading;
