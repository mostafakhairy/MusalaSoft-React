import React, { useEffect, useState, Fragment } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import gatewayService from '../../../services/gateway.service';
import Notification from '../../shared/Notification/Notification';
import AppSpinner from '../../shared/AppSpinner/AppSpinner';
import ActionBtns from '../../shared/ActionBtns/ActionsBtns';

export default function GatewayList() {
  const [gatewayListState, setGatewayListState] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  const history = useHistory();
  function listGateway() {}
  useEffect(() => {
    async function getGateway() {
      const data = await gatewayService.get();
      setGatewayListState(data);
      setLoadingState(false);
    }
    getGateway();
  }, []);
  async function onRemove(id) {
    const res = await gatewayService.remove(id);
    setGatewayListState(gatewayListState.filter((c) => c.id != id));
    Notification({ message: 'Gateway Removed', title: 'Success', type: 'success' });
  }
  function onEdit(id) {
    history.push(`/edit/${id}`);
  }
  return (
    <Fragment>
      {loadingState && <AppSpinner display={'Absolute'} position={'Center'} />}
      <NavLink className="btn btn-success my-2" to="/gateway/add">
        Add <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
      </NavLink>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Serial Number</th>
            <th>IPV4</th>
            <th>Devices</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(!gatewayListState || gatewayListState.length == 0) && (
            <tr>
              <td colSpan="6" className="text-center " style={{ height: '50vh' }}>
                No Gateway Available
              </td>
            </tr>
          )}

          {gatewayListState.length > 0 &&
            gatewayListState.map((gateway) => (
              <tr key={gateway.id}>
                <td>{gateway.id}</td>
                <td>{gateway.name}</td>
                <td>{gateway.serialNumber}</td>
                <td>{gateway.ipV4}</td>
                <td>
                  {gateway.devices.map((device) => (
                    <Badge variant="primary">{device.vendor}</Badge>
                  ))}
                </td>
                <td>
                  <ActionBtns
                    key={gateway.id}
                    onRemove={() => onRemove(gateway.id)}
                    onEdit={() => onEdit(gateway.id)}
                  ></ActionBtns>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Fragment>
  );
}
