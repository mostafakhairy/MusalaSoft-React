import React, { useState } from 'react';
import useForm from '../../../custom-hooks/useForm';
import gatewayService from '../../../services/gateway.service';
import Notification from '../../shared/Notification/Notification';
import GatewayForm from '../GatewayForm/GatewayForm';
import { gatewayFormJson } from '../gatewayFormJson';

const GatewayAdd = (props) => {
  const gateWayForm = gatewayFormJson;
  const [formState, onInputChange, resetForm, formValue] = useForm(gateWayForm);
  const [submittedState, setSubmittedState] = useState(false);
  const [devicesState, setDevicesState] = useState([{ uid: '' }]);
  const [errorState, setErrorState] = useState('');

  function addDevice() {
    console.log('add');
    let newState = [...devicesState];
    newState.push({ uid: '' });
    setDevicesState(newState);
  }
  function deleteDevice(index) {
    console.log('delete');
    let newState = devicesState.filter((c, i) => i != index);
    setDevicesState(newState);
  }
  function onDeviceChange(index, e) {
    console.log(index, e.target.value);
    let newState = [...devicesState];
    newState[index].uid = +e.target.value;
    newState[index].status = true;
    setDevicesState(newState);
  }
  async function submit(e) {
    e.preventDefault();
    const data = formValue();
    data.devices = devicesState;
    console.log(data);
    try {
      const res = await gatewayService.add(data);
      resetForm();
      setErrorState('');
      setDevicesState([{ uid: '' }]);
      Notification({ message: 'Gateway Added', title: 'Success', type: 'success' });
    } catch (ex) {
      handleError(ex);
    }
  }
  function handleError(ex) {
    let error = ex;
    let errorObj = ex.errors || ex;
    if (errorObj) {
      error = '';
      for (let [key, value] of Object.entries(errorObj)) {
        error += `${key}: ${value}`;
      }
    }
    setErrorState(error);

    console.log(ex);
  }
  return (
    <GatewayForm
      icon="plus"
      title="Add Gateway"
      onSubmit={submit}
      formState={formState}
      submittedState={submittedState}
      onDeviceChange={onDeviceChange}
      deleteDevice={deleteDevice}
      onInputChange={onInputChange}
      addDevice={addDevice}
      errorState={errorState}
      devicesState={devicesState}
      btnText="Add"
    ></GatewayForm>
  );
};
export default GatewayAdd;
