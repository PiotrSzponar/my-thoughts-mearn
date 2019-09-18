import React from 'react';
import { Link } from 'react-router-dom';
import ResponsiveAntMenu from 'responsive-ant-menu';
import { useMediaQuery } from 'react-responsive';
import { Layout, Menu, Icon, Button } from 'antd';

const { Header } = Layout;

const styledHeader = {
  position: 'fixed',
  zIndex: 100,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const styledLogo = {
  height: '64px',
  padding: '0',
  fontSize: '24px',
};

const styledMenu = {
  marginRight: 'auto',
  marginLeft: '10px',
};

const Navbar = () => {
  const xs = useMediaQuery({
    query: '(min-device-width: 480px)',
  });
  const md = useMediaQuery({
    query: '(min-device-width: 768px)',
  });

  return (
    <Header style={styledHeader}>
      <Link to="/">
        <Button type="link" size="large" ghost style={styledLogo}>
          <Icon type="bulb" />
          {xs && (
            <span>
              <strong>My</strong>Thoughts
            </span>
          )}
        </Button>
      </Link>
      {md && (
        <Menu mode="horizontal" theme="dark" style={styledMenu}>
          <Menu.Item key="hot">
            <Icon type="fire" />
            Hot!
          </Menu.Item>
          <Menu.Item key="friends">
            <Icon type="user" />
            Search friends
          </Menu.Item>
        </Menu>
      )}
      <ResponsiveAntMenu
        activeLinkKey="/"
        mobileMenuContent={isMenuShown =>
          isMenuShown ? (
            <Button type="primary">
              <Icon type="close" />
            </Button>
          ) : (
            <Button type="primary">
              <Icon type="menu" />
            </Button>
          )
        }
        mobileBreakPoint={768}
        placement="bottomRight"
        menuClassName="responsive-ant-menu"
        theme={isMobile => (isMobile ? 'light' : 'dark')}
        mode={isMobile => (isMobile ? 'vertical' : 'horizontal')}
      >
        {onLinkClick => (
          <Menu>
            {!md && (
              <Menu.Item onClick={onLinkClick} key="hotMobile">
                <Icon type="fire" />
                Hot!
              </Menu.Item>
            )}
            {!md && (
              <Menu.Item onClick={onLinkClick} key="friendsMobile">
                <Icon type="user" />
                Search friends
              </Menu.Item>
            )}
            <Menu.Item onClick={onLinkClick} key="signin">
              <Icon type="login" />
              Sign In
            </Menu.Item>
          </Menu>
        )}
      </ResponsiveAntMenu>
    </Header>
  );
};

export default Navbar;
