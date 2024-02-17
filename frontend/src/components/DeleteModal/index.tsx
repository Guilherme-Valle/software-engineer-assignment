import { SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteModal({ isOpen, closeModal, handleDelete }: {
  isOpen: boolean,
  closeModal: () => void,
  handleDelete: () => void
}) {

  const handleCancel = () => closeModal();
  const handleSubmit = () => handleDelete();

  return <Modal show={isOpen} onHide={handleCancel}>
    <Modal.Header closeButton>Are you sure you want to delete?</Modal.Header>
    <Modal.Body>The candidate will be permanently deleted</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="danger" onClick={() => handleSubmit()}>
        Delete
      </Button>
    </Modal.Footer>

  </Modal>
}
