import React, { Fragment, useState, useEffect } from 'react';
import devicesService from '../../../services/device.service';
import SelectBtns from '../SelectBtns/SelectBtns';
const DevicesSelect = (props) => {
  const { onAddDevice, onDeleteDevice, devicesState, onDeviceChange } = props;
  const [devicesDataState, setdevicesDataState] = useState([]);
  useEffect(() => {
    async function getDevice() {
      const data = await devicesService.get();
      setdevicesDataState(data);
      console.log(data);
    }
    getDevice();
  }, []);
  return (
    <Fragment>
      {devicesState.map((y, index) => (
        <div className="d-flex">
          <select className="form-control" value={y.uid} onChange={(e) => onDeviceChange(index, e)}>
            <option value="">Select Device</option>
            {devicesDataState.map((c) => {
              let dev = devicesState.find((x) => x.uid == c.uid);
              return (
                (y.uid == c.uid || (!c.status && (!dev || !dev.status))) && (
                  <option value={c.uid}>{c.vendor}</option>
                )
              );
            })}
          </select>

          <SelectBtns
            onAdd={onAddDevice}
            onDelete={() => onDeleteDevice(index)}
            disableMinus={devicesState.length <= 1}
            disablePlus={devicesState.length >= 10}
          ></SelectBtns>
        </div>
      ))}
    </Fragment>
  );
};
export default DevicesSelect;
