import React from 'react';
import AppSpinner from '../AppSpinner/AppSpinner';
const SubmitBtn = (props) => {
  const { index, loading, disabled, text } = props;
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      tabIndex={index}
      style={{ padding: '.7rem' }}
      disabled={disabled || loading}
    >
      {text}
      {loading && <AppSpinner />}
    </button>
  );
};
export default SubmitBtn;
