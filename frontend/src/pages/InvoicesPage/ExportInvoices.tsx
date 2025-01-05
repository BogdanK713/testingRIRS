import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./ExcelImporter/ExcelImporter.css";

interface ExportInvoicesProps {
  onExportSuccess?: () => void;
  onExportError?: (error: any) => void;
}

const ExportInvoices: React.FC<ExportInvoicesProps> = ({
  onExportSuccess,
  onExportError,
}) => {
  const handleExportInvoices = async () => {
    try {
      const response = await axios.get("https://testingiris.onrender.com/db/export", {
        responseType: "blob", // Treat the response as a file
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoices.json"); // Name of the exported file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Invoices exported successfully!");
      if (onExportSuccess) onExportSuccess();
    } catch (error) {
      console.error("Error exporting invoices:", error);
      alert("Failed to export invoices.");
      if (onExportError) onExportError(error);
    }
  };

  return (
    <Button variant="success" onClick={handleExportInvoices}>
      Izvozi račune
    </Button>
  );
};

export default ExportInvoices;
