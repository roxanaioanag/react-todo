import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function ModalDialog(props) {

  return (
    <>
     
    <Modal show={props.show}>
        <Modal.Header closeButton onClick={props.onHide}>
          <Modal.Title>Create Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form  onSubmit={props.onSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                                type="text"
                                name='title'
                                placeholder="title"
                                autoFocus
                                onChange={e => props.onChange(e.target)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                                type="text"
                                name='description'
                                placeholder="description"
                                onChange={e => props.onChange(e.target)} />
                        </Form.Group>
                <Button type="submit" variant="dark"  onClick={props.onHide}> Create </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}
export default ModalDialog;