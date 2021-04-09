import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import DevicesSelect from '../../shared/DevicesSelect/DevicesSelect';
import SubmitBtn from '../../shared/SubmitBtn/SubmitBtn';
import FormInput from '../../shared/FormInput/FormInput';
import ErrorAlert from '../../shared/ErrorAlert/ErrorAlert';

const GatewayForm = (props) => {
  const {
    title,
    icon,
    formState,
    errorState,
    devicesState,
    addDevice,
    deleteDevice,
    onDeviceChange,
    submittedState,
    onSubmit,
    onInputChange,
    btnText,
  } = props;
  return (
    <div className="card">
      <div className="card-header">
        <h4>
          <FontAwesomeIcon icon={icon} size="2xl"></FontAwesomeIcon> {title}
        </h4>
      </div>
      <div className="card-body">
        <form action="post" className="col-12 col-md-8 col-lg-6 m-auto" onSubmit={onSubmit}>
          {formState.formControls.map((input) => {
            return (
              <FormInput
                key={input.name}
                config={input}
                inputChange={(e) => {
                  onInputChange(e);
                }}
                rested={formState.formReset}
              />
            );
          })}

          <div className="form-group">
            <label htmlFor="devices">Devices</label>
            <DevicesSelect
              devicesState={devicesState}
              onAddDevice={addDevice}
              onDeleteDevice={deleteDevice}
              onDeviceChange={onDeviceChange}
            ></DevicesSelect>
          </div>
          <div className="d-flex text-center">
            <div className="col-4 p-0">
              <SubmitBtn
                text={btnText}
                index={formState.formControls.length + 1}
                disabled={!formState.isValidForm}
                loading={submittedState}
              ></SubmitBtn>
            </div>
            <NavLink className="btn btn-default" to="/gateway">
              Back
            </NavLink>
          </div>
        </form>
        <ErrorAlert show={!!errorState} message={errorState} />
      </div>
    </div>
  );
};
export default GatewayForm;
