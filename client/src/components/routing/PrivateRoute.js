import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuth, loading, user },
  ...rest
}) => {
  const afterSigninRoute = ({ match, ...other }) =>
    !user.isCompleted && !match.path.includes('/user/complete') ? (
      <Redirect to="/user/complete" />
    ) : (
      <Component {...other} />
    );

  return (
    <Route
      {...rest}
      render={props =>
        !isAuth && !loading ? <Redirect to="/" /> : afterSigninRoute(props)
      }
    />
  );
};

PrivateRoute.defaultProps = {
  match: {},
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
