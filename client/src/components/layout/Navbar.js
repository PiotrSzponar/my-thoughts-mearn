import React from 'react';
import { Layout, Menu, Icon, Button } from 'antd';

const { Header } = Layout;

const Navbar = () => (
  <Header
    style={{
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Button
      type="link"
      size="large"
      ghost
      style={{
        height: '64px',
        padding: '0',
        fontSize: '24px',
      }}
    >
      <Icon type="bulb" /> <strong>My</strong>Thoughts
    </Button>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
    </Menu>
  </Header>
);

export default Navbar;
