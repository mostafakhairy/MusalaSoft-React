import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const SelectBtns = (props) => {
  const { onAdd, onDelete, disableMinus, disablePlus } = props;
  return (
    <div className="d-flex p-2">
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip id="remove">Remove</Tooltip>}
      >
        <button type="button" style={{ width: '30px' }} onClick={onDelete} disabled={disableMinus}>
          <div>
            <FontAwesomeIcon icon="minus" className="text-danger"></FontAwesomeIcon>
          </div>
        </button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip id="edit">Add</Tooltip>}
      >
        <button type="button" style={{ width: '30px' }} onClick={onAdd} disabled={disablePlus}>
          <div>
            <FontAwesomeIcon icon="plus" className="text-warning"></FontAwesomeIcon>
          </div>
        </button>
      </OverlayTrigger>
    </div>
  );
};
export default SelectBtns;
