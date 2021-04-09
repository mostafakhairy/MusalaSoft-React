import React from 'react';
import Alert from 'react-bootstrap/Alert';
const ErrorAlert = ({ show, message }) => {
  return (
    <Alert show={show} variant="danger" className="border border-danger pt-3">
      <div className="">
        <p>{message}</p>
        <i className="fa fa-exclamation-circle text-danger fa-2x m-2" aria-hidden="true"></i>
      </div>
    </Alert>
  );
};
export default ErrorAlert;
