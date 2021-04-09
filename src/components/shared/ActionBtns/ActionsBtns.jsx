import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const ActionBtns = (props) => {
  const { onRemove, onEdit } = props;

  return (
    <div className="d-flex px-2">
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip id="remove">Remove</Tooltip>}
      >
        <a href="#" style={{ width: '30px' }} onClick={onRemove}>
          <div>
            <FontAwesomeIcon icon="trash" className="text-danger"></FontAwesomeIcon>
          </div>
        </a>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip id="edit">Edit</Tooltip>}
      >
        <a href="#" style={{ width: '30px' }} onClick={onEdit}>
          <div>
            <FontAwesomeIcon icon="pen" className="text-warning"></FontAwesomeIcon>
          </div>
        </a>
      </OverlayTrigger>
    </div>
  );
};
export default ActionBtns;
