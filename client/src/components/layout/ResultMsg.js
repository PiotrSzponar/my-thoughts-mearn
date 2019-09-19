import React from 'react';
import PropTypes from 'prop-types';
import { Result } from 'antd';

const ResultMsg = ({ status, title, subTitle, extra }) => (
  <Result
    status={status}
    title={title}
    subTitle={subTitle}
    extra={extra}
    style={{ padding: 0 }}
  />
);

ResultMsg.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  extra: PropTypes.node.isRequired,
};

export default ResultMsg;
