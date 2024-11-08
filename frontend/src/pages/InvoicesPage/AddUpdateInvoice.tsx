import React, { useState } from "react";
import "./AddUpdateInvoice.css";
import { Button, Form } from "react-bootstrap";
import SaveConfirmationModal from "./SaveConfirmationModal";

// Interface defining the structure of invoice data
export interface InvoiceData {
    name: string;
    amount: number;
    date: string;
    dueDate: string;
    payer: string;
    statusSent: boolean;
    statusPaid: boolean;
}

// Interface for component props
interface AddUpdateInvoiceProps {
    onSave: (invoiceData: InvoiceData) => void;
    mode: 'add' | 'edit';
    initialData?: InvoiceData;
}

// Component definition
const AddUpdateInvoice: React.FC<AddUpdateInvoiceProps> = ({ onSave, mode, initialData }) => {
    // State for form data
    const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialData || {
        name: "",
        amount: 0,
        date: "",
        dueDate: "",
        payer: "",
        statusSent: false,
        statusPaid: false,
    });

    // State for modal visibility
    const [showModal, setShowModal] = useState(false);

    // Handles form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvoiceData({ ...invoiceData, [name]: value });
    };

    // Shows the modal
    const handleSave = () => {
        setShowModal(true);
    };

    // Confirms save and triggers onSave prop function
    const confirmSave = () => {
        onSave(invoiceData);
        setShowModal(false);
    };

    return (
        <div className="invoice-form-container">
            <h3>{mode === 'add' ? "Add New Invoice" : "Update Invoice"}</h3>
            <Form>
                <Form.Group controlId="name">
                    <Form.Label>Invoice Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={invoiceData.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        name="amount"
                        value={invoiceData.amount}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Label>Issue Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={invoiceData.date}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="dueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        value={invoiceData.dueDate}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="payer">
                    <Form.Label>Payer</Form.Label>
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
                        label="Status Sent"
                        name="statusSent"
                        checked={invoiceData.statusSent}
                        onChange={(e) => setInvoiceData({ ...invoiceData, statusSent: e.target.checked })}
                    />
                </Form.Group>
                <Form.Group controlId="statusPaid">
                    <Form.Check
                        type="checkbox"
                        label="Status Paid"
                        name="statusPaid"
                        checked={invoiceData.statusPaid}
                        onChange={(e) => setInvoiceData({ ...invoiceData, statusPaid: e.target.checked })}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Form>
            <SaveConfirmationModal
                show={showModal}
                onConfirm={confirmSave}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default AddUpdateInvoice;
