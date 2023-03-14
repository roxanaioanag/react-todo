import React , { ReactNode, MouseEventHandler, ReactElement, FC  } from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {
  show: boolean,
  title: string,
  children: ReactNode,
  btnVisible?: boolean, 
  onAction?: MouseEventHandler,
  onHide: MouseEventHandler
}


const ModalDialog  :FC<Props> = ({show, title, children, btnVisible, onAction, onHide}) : ReactElement => {
 

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