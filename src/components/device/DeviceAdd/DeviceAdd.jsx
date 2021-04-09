import React, { useState } from 'react';
import DeviceForm from '../DeviceForm/DeviceForm';
import devicesService from '../../../services/device.service';
import Notification from '../../shared/Notification/Notification';

export default function DeviceAdd() {
  const initState = { vendor: '', valid: false, submitted: false };
  const [formState, setFormState] = useState(initState);
  async function submit(e) {
    e.preventDefault();
    await devicesService.add({ vendor: formState.vendor });
    Notification({ message: 'Device Added', title: 'Success', type: 'success' });
    setFormState(initState);
  }
  function onChange(e) {
    setFormState({ ...{ vendor: e.target.value, valid: !!e.target.value } });
  }
  return (
    <DeviceForm
      onSubmit={submit}
      formState={formState}
      onChange={onChange}
      submitBtnText="Add"
    ></DeviceForm>
  );
}
