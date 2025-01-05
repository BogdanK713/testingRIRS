import React, { useState } from "react";
import axios from "axios";
import "./InvoicesPage.css";
import InvoiceTable from "./Table/InvoiceTable";
import ExportInvoices from "./ExportInvoices";
import ExcelFileInput from "./ExcelImporter/ExcelImporter";
import AddInvoiceModal from "./AddInvoiceModal";
import ContactPayer from "./ContactPayer";
import Modal from "./Modal"; // A generic modal component

interface Invoice {
  id: number;
  name: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  statusPaid: boolean;
  payer: string;
}

const InvoicesPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false); // Toggle contact form
  const [overdueInvoices, setOverdueInvoices] = useState<Invoice[]>([]);
  const [showOverdueModal, setShowOverdueModal] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const fetchOverdueInvoices = async () => {
    try {
      const response = await axios.get<Invoice[]>("https://testingiris.onrender.com/db/overdue");
      setOverdueInvoices(response.data);
      setShowOverdueModal(true);
    } catch (error) {
      console.error("Error fetching overdue invoices:", error);
    }
  };

  return (
    <div id="table-container">
      <h3>Invoices</h3>

      <div id="button-container">
        <button className="btn btn-secondary" onClick={fetchOverdueInvoices}>
          View Overdue Invoices
        </button>
        <ExportInvoices />
        <ExcelFileInput importInvoices={handleRefresh} />
        <button
          className="btn btn-primary"
          style={{ marginLeft: "10px" }}
          onClick={() => setShowAddModal(true)}
        >
          Add New Invoice
        </button>
      </div>

      <InvoiceTable />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          className="btn btn-secondary"
          onClick={() => setShowContactForm(!showContactForm)}
        >
          {showContactForm ? "Hide Contact Form" : "Show Contact Form"}
        </button>
      </div>

      {showContactForm && (
        <div style={{ marginTop: "20px" }}>
          <ContactPayer />
        </div>
      )}

      {/* Add Invoice Modal */}
      <AddInvoiceModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSaveSuccess={handleRefresh}
      />

      {/* Overdue Invoices Modal */}
      {showOverdueModal && (
        <Modal onClose={() => setShowOverdueModal(false)} title="Overdue Invoices">
        {overdueInvoices.length > 0 ? (
            <ul>
                {overdueInvoices.map((invoice) => (
                    <li key={invoice.id}> {/* Ensure a unique key */}
                        <strong>{invoice.name}</strong> - Due Date: {invoice.dueDate} - Amount: {invoice.amount}€
                    </li>
                ))}
            </ul>
        ) : (
            <p>No overdue invoices found.</p>
        )}
    </Modal>
    
      )}
    </div>
  );
};

export default InvoicesPage;
