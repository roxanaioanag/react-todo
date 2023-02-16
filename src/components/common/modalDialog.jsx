import React from 'react';
import { Modal, Button } from 'react-bootstrap';


function ModalDialog(props) {


  return (
    <>
     
    <Modal show={props.show}>
        <Modal.Header closeButton onClick={props.onHide}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
        { props.btnVisible ? <Button variant="primary" onClick={ props.onAction}>Save</Button> : <></>}
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}
export default ModalDialog;