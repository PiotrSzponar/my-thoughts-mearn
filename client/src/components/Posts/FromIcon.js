import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const FromIcon = ({ from }) => {
  if (from === 'stranger') {
    return <Icon type="global" title="Post from stranger" />;
  }
  if (from === 'friend') {
    return <Icon type="team" title="Post from your friend" />;
  }
  return '';
};

FromIcon.propTypes = {
  from: PropTypes.string.isRequired,
};

export default FromIcon;
