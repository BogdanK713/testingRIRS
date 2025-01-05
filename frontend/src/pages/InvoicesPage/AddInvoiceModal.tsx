import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import "./AddInvoiceModal.css";

export interface InvoiceData {
  name: string;
  amount: number;
  date: string;
  dueDate: string;
  payer: string;
  statusSent: boolean;
  statusPaid: boolean;
}

interface AddInvoiceModalProps {
  show: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}

const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({
  show,
  onClose,
  onSaveSuccess,
}) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    name: "",
    amount: 0,
    date: "",
    dueDate: "",
    payer: "",
    statusSent: false,
    statusPaid: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.post("https://testingiris.onrender.com/db/add", invoiceData);
      alert("Invoice added successfully!");
      onSaveSuccess(); // Notify parent to refresh the list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding invoice:", error);
      alert("Failed to save invoice.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj nov račun</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Naziv računa</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={invoiceData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Znesek</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={invoiceData.amount}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Datum izdaje</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={invoiceData.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="dueDate">
            <Form.Label>Rok plačila</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={invoiceData.dueDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="payer">
            <Form.Label>Plačnik</Form.Label>
            <Form.Control
              type="text"
              name="payer"
              value={invoiceData.payer}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="statusSent">
            <Form.Check
              type="checkbox"
              label="Poslano"
              name="statusSent"
              checked={invoiceData.statusSent}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="statusPaid">
            <Form.Check
              type="checkbox"
              label="Plačano"
              name="statusPaid"
              checked={invoiceData.statusPaid}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Zapri
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Shrani
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddInvoiceModal;
