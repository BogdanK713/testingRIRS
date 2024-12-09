import React, { useState } from "react";
import "./InvoicesPage.css";
import InvoiceTable from "./Table/InvoiceTable";
import ExportInvoices from "./ExportInvoices";
import ExcelFileInput from "./ExcelImporter/ExcelImporter";
import AddInvoiceModal from "./AddInvoiceModal";
import ContactPayer from "./ContactPayer";

const InvoicesPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false); // State to toggle contact form

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div id="table-container">
      <h3>Računi</h3>

      <div id="button-container">
        <ExportInvoices />
        <ExcelFileInput importInvoices={handleRefresh} />
        <button
          className="btn btn-primary"
          style={{ marginLeft: "10px" }}
          onClick={() => setShowAddModal(true)}
        >
          Dodaj nov račun
        </button>
      </div>

      <InvoiceTable />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          className="btn btn-secondary"
          onClick={() => setShowContactForm(!showContactForm)}
        >
          {showContactForm ? "Skrij obrazec za stik" : "Pokaži obrazec za stik"}
        </button>
      </div>

      {showContactForm && (
        <div style={{ marginTop: "20px" }}>
          <ContactPayer />
        </div>
      )}

      <AddInvoiceModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSaveSuccess={handleRefresh}
      />
    </div>
  );
};

export default InvoicesPage;
