import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SubmitBtn from '../../shared/SubmitBtn/SubmitBtn';

import { NavLink } from 'react-router-dom';
export default function DeviceForm(props) {
  const { formState, onSubmit, onChange, submitBtnText } = props;
  return (
    <div className="card">
      <div className="card-header">
        <h4>
          <FontAwesomeIcon icon="plus" size="2xl"></FontAwesomeIcon> Add Device
        </h4>
      </div>
      <div className="card-body">
        <form action="post" className="col-12 col-md-8 col-lg-6 m-auto" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Vendor</label>
            <input
              type="text"
              name="name"
              value={formState.vendor}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>

          <div className="d-flex text-center">
            <div className="col-4 p-0">
              <SubmitBtn
                text={submitBtnText}
                loading={formState.submitted}
                disabled={!formState.valid}
              ></SubmitBtn>
            </div>
            <NavLink className="btn btn-default" to="/devices">
              Back
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
