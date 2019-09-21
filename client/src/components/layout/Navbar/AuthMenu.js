import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon, Divider, Avatar } from 'antd';
import { logout } from '../../../actions/auth';
import { hideDrawer } from '../../../actions/layout';

const { SubMenu } = Menu;

const AuthMenu = ({ mode, theme, logout, hideDrawer }) => {
  return (
    <>
      <Menu
        mode={mode}
        theme={theme}
        style={{ lineHeight: '64px', marginRight: 'auto' }}
        selectable={false}
        onClick={hideDrawer}
      >
        <Menu.Item key="hot">
          <Link to="/hot">
            <Icon type="fire" />
            Hot posts!
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Link to="/search">
            <Icon type="search" />
            Search
          </Link>
        </Menu.Item>
      </Menu>
      {mode === 'inline' && <Divider />}
      <Menu
        mode={mode}
        theme={theme}
        style={{ lineHeight: '64px' }}
        selectable={false}
        onClick={hideDrawer}
      >
        <SubMenu
          title={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size="small" icon="user" />
              &nbsp; Piotr Szponar
            </span>
          }
        >
          <Menu.Item key="profile">
            <Link to="/profile">My profile</Link>
          </Menu.Item>
          <Menu.Item key="posts">
            <Link to="/posts">My posts</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={logout}>
            <Icon type="logout" />
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};

AuthMenu.propTypes = {
  mode: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  hideDrawer: PropTypes.func.isRequired,
};

export default connect(
  null,
  { logout, hideDrawer },
)(AuthMenu);
