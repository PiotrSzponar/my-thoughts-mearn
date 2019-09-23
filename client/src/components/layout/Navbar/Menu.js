import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthMenu from './AuthMenu';
import GuestMenu from './GuestMenu';

const Menu = ({ auth: { isAuth, loading, user }, mode, theme }) => {
  if (!loading) {
    return isAuth ? (
      <AuthMenu mode={mode} theme={theme} user={user} />
    ) : (
      <GuestMenu mode={mode} theme={theme} />
    );
  }
  return <>&nbsp;</>;
};

Menu.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  mode: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Menu);
