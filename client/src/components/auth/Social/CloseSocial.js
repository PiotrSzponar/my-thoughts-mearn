import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Icon, Button, Typography } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const CloseSocial = ({ match, isAuth }) => {
  const closeTab = useCallback(() => {
    window.open('about:blank', '_self');
    window.close();
  }, []);

  useEffect(() => {
    if (isAuth || !match) {
      closeTab();
    }
    localStorage.setItem('token', match.params.token);
    closeTab();
  }, [isAuth, match, closeTab]);

  return (
    <Layout className="layout">
      <Header>
        <Button type="link" size="large" ghost block>
          <Icon type="bulb" /> MyThoughts
        </Button>
      </Header>
      <Content style={{ padding: '25px', minHeight: 'calc(100vh - 133px)' }}>
        <div style={{ background: '#fff', padding: 24, textAlign: 'center' }}>
          <Title level={2}>
            <Icon type="check-circle" /> Success!
          </Title>
          <Text>Now, you can close this window:</Text>
          <br />
          <br />
          <Button type="primary" onClick={closeTab} block>
            Close this window
          </Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Icon type="bulb" />
        &nbsp;MyThoughts &copy;{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

CloseSocial.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(CloseSocial);
