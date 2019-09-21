import React from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button, Icon } from 'antd';

import styles from './Alert.module.scss';

const AlertMsg = ({ alerts }) =>
  alerts !== undefined &&
  alerts.length > 0 && (
    <div className={styles.alertWrapper}>
      {alerts.map(alert => (
        <Alert
          message={
            alert.msg === 'Not verified' ? (
              <>
                <p>
                  <strong>User hasn&apos;t confirm email address.</strong>{' '}
                  Please check your inbox and click the confirmation link.
                </p>
                <span>You can also &nbsp;</span>
                <Link to="/resend-verification">
                  <Button size="small">
                    <Icon type="redo" />
                    Resend verification email
                  </Button>
                </Link>
              </>
            ) : (
              alert.msg
            )
          }
          type={alert.msgType}
          showIcon
          closable
          key={alert.id}
        />
      ))}
    </div>
  );

AlertMsg.propTypes = {
  alerts: PropTypes.arrayOf(object),
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertMsg);
