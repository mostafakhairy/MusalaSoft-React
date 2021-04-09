import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DeviceForm from '../DeviceForm/DeviceForm';
import devicesService from '../../../services/device.service';
import Notification from '../../shared/Notification/Notification';
export default function DeviceEdit() {
  let { id } = useParams();
  const initState = { uid: '', vendor: '', valid: false, submitted: false };
  const history = useHistory();
  const [formState, setFormState] = useState(initState);
  useEffect(() => {
    async function getDevice() {
      const data = await devicesService.getById(id);
      console.log(data);
      setFormState({ ...formState, uid: data.uid, vendor: data.vendor, valid: true });
    }
    getDevice();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    await devicesService.edit({ uid: formState.uid, vendor: formState.vendor });
    Notification({ message: 'Device Edited', title: 'Success', type: 'success' });
    history.push('/devices');
  }
  function onChange(e) {
    setFormState({ ...formState, vendor: e.target.value, valid: !!e.target.value });
  }

  return (
    <DeviceForm
      onSubmit={submit}
      formState={formState}
      onChange={onChange}
      submitBtnText="Edit"
    ></DeviceForm>
  );
}
