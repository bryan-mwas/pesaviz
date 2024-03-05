import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function FloatAlert() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Alert</ModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
}

export default FloatAlert;
