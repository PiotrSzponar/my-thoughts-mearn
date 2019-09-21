import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Layout, Icon, Button, Drawer } from 'antd';
import Menu from './Menu';
import { showDrawer, hideDrawer } from '../../../actions/layout';
import styles from './Navbar.module.scss';

const { Header } = Layout;

const Navbar = ({ show, showDrawer, hideDrawer }) => {
  const xs = useMediaQuery({
    query: '(min-device-width: 480px)',
  });
  const md = useMediaQuery({
    query: '(min-device-width: 768px)',
  });

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
        onClose={hideDrawer}
        visible={show}
      >
        <Menu mode="inline" theme="light" />
      </Drawer>
    </Header>
  );
};

Navbar.propTypes = {
  show: PropTypes.bool.isRequired,
  showDrawer: PropTypes.func.isRequired,
  hideDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  show: state.layout.show,
});

export default connect(
  mapStateToProps,
  { showDrawer, hideDrawer },
)(Navbar);
