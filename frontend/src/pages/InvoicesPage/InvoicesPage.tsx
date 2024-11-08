import React from "react";
import AddUpdateInvoice, { InvoiceData } from "./AddUpdateInvoice";

const InvoicesPage: React.FC = () => {
    const handleSaveInvoice = (invoiceData: InvoiceData) => {
        console.log("Invoice saved:", invoiceData);
    };

    // Dummy data for testing the update mode
    const dummyInvoice: InvoiceData = {
        name: "Dummy Invoice",
        amount: 100,
        date: "2024-01-01",
        dueDate: "2024-02-01",
        payer: "Sample Payer",
        statusSent: true,
        statusPaid: false,
    };

    return (
        <div>
            <h2>Manage Invoices</h2>
            {/* To test "add" mode */}
            {/* <AddUpdateInvoice onSave={handleSaveInvoice} mode="add" /> */}
            
            {/* To test "edit" mode with initial data */}
            <AddUpdateInvoice onSave={handleSaveInvoice} mode="edit" initialData={dummyInvoice} />
        </div>
    );
};

export default InvoicesPage;
