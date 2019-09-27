import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon, Divider, Avatar } from 'antd';
import { logout } from '../../../actions/auth';
import { hideDrawer } from '../../../actions/layout';

const { SubMenu } = Menu;

const AuthMenu = ({
  mode,
  theme,
  logout,
  hideDrawer,
  user: { name, photo, _id },
}) => {
  return (
    <>
      <Menu
        mode={mode}
        theme={theme}
        style={{ lineHeight: '64px', marginRight: 'auto' }}
        selectable={false}
        onClick={hideDrawer}
      >
        <Menu.Item key="add-post">
          <Link to="/post/add">
            <Icon type="plus-circle" />
            Add post
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
              <Avatar size="small" src={`/images/users/${photo}`} />
              &nbsp; {name}
            </span>
          }
        >
          <Menu.Item key="profile">
            <Link to={`/user/${_id}`}>My profile</Link>
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

AuthMenu.defaultProps = {
  photo: '',
  name: '',
  _id: '',
};

AuthMenu.propTypes = {
  mode: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  hideDrawer: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  photo: PropTypes.string,
  name: PropTypes.string,
  _id: PropTypes.string,
};

export default connect(
  null,
  { logout, hideDrawer },
)(AuthMenu);
