import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from '../AppSpinner/AppSpinner.module.scss';

const AppSpinner = ({ display = 'Center', position = 'Absolute' }) => {
  let classes = '';
  classes = styles[display];
  classes += ' ' + styles[position];
  return (
    <div className={classes}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};
export default AppSpinner;
