import React from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'antd';

import styles from './Alert.module.scss';

const AlertMsg = ({ alerts }) =>
  alerts !== undefined &&
  alerts.length > 0 && (
    <div className={styles.alertWrapper}>
      {alerts.map(alert => (
        <Alert
          message={alert.msg}
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
