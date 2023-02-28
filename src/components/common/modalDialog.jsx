import React  from 'react';
import { Modal, Button } from 'react-bootstrap';


function ModalDialog({show, title, children, btnVisible, onAction, onHide}) {
 

  return (
    <>
     
    <Modal show={show}>
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
        { btnVisible ? <Button variant="primary" onClick={ onAction}>Save</Button> : <></>}
          <Button variant="danger" onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}
export default ModalDialog;