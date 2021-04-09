import React, { Fragment, useState, useEffect } from 'react';
import { Table, Badge } from 'react-bootstrap';
import ActionBtns from '../../shared/ActionBtns/ActionsBtns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Notification from '../../shared/Notification/Notification';
import devicesService from '../../../services/device.service';
import AppSpinner from '../../shared/AppSpinner/AppSpinner';

export default function DeviceList() {
  const [deviceListState, setDeviceListState] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const history = useHistory();
  useEffect(() => {
    async function getDevice() {
      const data = await devicesService.get();
      setDeviceListState(data);
      setLoadingState(false);
    }
    getDevice();
  }, []);

  async function onRemove(id) {
    const res = await devicesService.remove(id);
    setDeviceListState(deviceListState.filter((c) => c.id != id));
    Notification({ message: 'Device Removed', title: 'Success', type: 'success' });
  }
  function onEdit(id) {
    history.push(`devices/edit/${id}`);
  }
  return (
    <Fragment>
      {loadingState && <AppSpinner display={'Absolute'} position={'Center'} />}
      <NavLink className="btn btn-success my-2" to="/devices/add">
        Add <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
      </NavLink>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Uid</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(!deviceListState || deviceListState.length == 0) && (
            <tr>
              <td colSpan="6" className="text-center " style={{ height: '50vh' }}>
                No Devices Available
              </td>
            </tr>
          )}

          {deviceListState.length > 0 &&
            deviceListState.map((device) => (
              <tr key={device.uid}>
                <td>{device.uid}</td>
                <td>{device.vendor}</td>
                <td>{device.status ? 'Online' : 'Offline'}</td>
                <td>{device.date}</td>
                <td>
                  <ActionBtns
                    onRemove={() => onRemove(device.uid)}
                    onEdit={() => onEdit(device.uid)}
                  ></ActionBtns>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Fragment>
  );
}
