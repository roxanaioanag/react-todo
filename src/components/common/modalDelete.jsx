import React from 'react';
import { Modal, Button } from 'react-bootstrap';


function ModalDelete(props) {

  return (
    <>
     
    <Modal show={props.show}>
        <Modal.Header closeButton onClick={props.onHide}>
          <Modal.Title>Create Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete Todo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ props.onDelete}>Save</Button>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}
export default ModalDelete;