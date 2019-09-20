import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Icon, Divider } from 'antd';

const GuestMenu = ({ mode, theme }) => {
  return (
    <>
      <Menu
        mode={mode}
        theme={theme}
        style={{ lineHeight: '64px', marginRight: 'auto' }}
        selectable={false}
      >
        <Menu.Item key="hot">
          <Link to="/hot">
            <Icon type="fire" />
            Hot posts!
          </Link>
        </Menu.Item>
      </Menu>
      {mode === 'vertical' && <Divider />}
      <Menu
        mode={mode}
        theme={theme}
        style={{ lineHeight: '64px' }}
        selectable={false}
      >
        <Menu.Item key="signin">
          <Link to="/signin">
            <Icon type="login" />
            Sign In
          </Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link to="/signup">
            <Icon type="user" />
            Sign Up
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

GuestMenu.propTypes = {
  mode: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

export default GuestMenu;
