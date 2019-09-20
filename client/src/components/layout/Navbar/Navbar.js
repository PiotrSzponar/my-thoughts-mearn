import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Layout, Icon, Button, Drawer } from 'antd';
import Menu from './Menu';
import styles from './Navbar.module.scss';

const { Header } = Layout;

const Navbar = () => {
  const xs = useMediaQuery({
    query: '(min-device-width: 480px)',
  });
  const md = useMediaQuery({
    query: '(min-device-width: 768px)',
  });

  const [drawer, setDrawer] = useState(false);

  const showDrawer = () => {
    setDrawer(true);
  };
  const closeDrawer = () => {
    setDrawer(false);
  };

  return (
    <Header className={styles.styledHeader}>
      <Link to="/">
        <Button type="link" size="large" ghost className={styles.styledLogo}>
          <Icon type="bulb" />
          {xs && <span>MyThoughts</span>}
        </Button>
      </Link>
      {md ? (
        <Menu mode="horizontal" theme="dark" />
      ) : (
        <Button type="primary" onClick={showDrawer}>
          <Icon type="menu" />
        </Button>
      )}
      <Drawer
        placement="right"
        closable={false}
        onClose={closeDrawer}
        visible={drawer}
      >
        <Menu mode="inline" theme="light" />
      </Drawer>
    </Header>
  );
};

export default Navbar;
