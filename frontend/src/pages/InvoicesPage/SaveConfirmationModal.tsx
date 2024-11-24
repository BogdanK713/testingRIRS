import React from "react";
import { Modal, Button } from "react-bootstrap";

// Interface for modal props
interface SaveConfirmationModalProps {
    show: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

// Modal component definition
const SaveConfirmationModal: React.FC<SaveConfirmationModalProps> = ({ show, onConfirm, onClose }) => (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to save this invoice?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>
);

export default SaveConfirmationModal;
