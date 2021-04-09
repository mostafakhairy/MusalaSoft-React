import React, { useState, useEffect } from 'react';
import useForm from '../../../custom-hooks/useForm';
import gatewayService from '../../../services/gateway.service';
import Notification from '../../shared/Notification/Notification';
import GatewayForm from '../GatewayForm/GatewayForm';
import { useParams, useHistory } from 'react-router-dom';
import { gatewayFormJson } from '../gatewayFormJson';

const GatewayEdit = (props) => {
  const gateWayForm = gatewayFormJson;
  const [formState, onInputChange, resetForm, formValue, setFormState] = useForm(gateWayForm);
  const [submittedState, setSubmittedState] = useState(false);
  const [devicesState, setDevicesState] = useState([{ uid: '' }]);
  const [errorState, setErrorState] = useState('');
  let { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    async function getGateway() {
      let gateway = await gatewayService.getById(id);
      console.log(gateway);
      let deviceSta = gateway.devices.length > 0 ? gateway.devices : [{ uid: '' }];
      setDevicesState(deviceSta);
      let newState = { ...formState };
      for (let control of newState.formControls) {
        control.value = gateway[control.name];
      }
      newState.isValidForm = true;
      console.log(newState);
      setFormState(newState);
    }
    getGateway();
  }, [id]);

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

    data.devices = devicesState.filter((c) => +c.uid > 0);
    console.log(data.deleteDevice);
    console.log(devicesState);
    data.id = +id;
    try {
      const res = await gatewayService.edit(data);
      resetForm();
      setErrorState('');
      setDevicesState([{ uid: '' }]);
      Notification({ message: 'Gateway Edited', title: 'Success', type: 'success' });
      history.push('/gateway');
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
      icon="pen"
      title="Edit Gateway"
      onSubmit={submit}
      formState={formState}
      submittedState={submittedState}
      onDeviceChange={onDeviceChange}
      deleteDevice={deleteDevice}
      onInputChange={onInputChange}
      addDevice={addDevice}
      errorState={errorState}
      devicesState={devicesState}
      btnText="Edit"
    ></GatewayForm>
  );
};
export default GatewayEdit;
