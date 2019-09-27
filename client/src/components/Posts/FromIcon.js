import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const FromIcon = ({ from, what }) => {
  if (from === 'stranger') {
    return (
      <Icon
        type="global"
        title={what === 'post' ? 'Post from stranger' : 'Stranger'}
      />
    );
  }
  if (from === 'friend') {
    return <Icon type="team" title={what === 'post' ? 'Post from your friend' : 'Friend'} />;
  }
  return '';
};

FromIcon.propTypes = {
  from: PropTypes.string.isRequired,
  what: PropTypes.string.isRequired,
};

export default FromIcon;
