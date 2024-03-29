import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { hideDrawer } from '../../../actions/layout';

const GuestMenu = ({ mode, theme, hideDrawer }) => (
  <Menu
    mode={mode}
    theme={theme}
    style={{ lineHeight: '64px' }}
    selectable={false}
    onClick={hideDrawer}
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
);

GuestMenu.propTypes = {
  mode: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  hideDrawer: PropTypes.func.isRequired,
};

export default connect(
  null,
  { hideDrawer },
)(GuestMenu);
