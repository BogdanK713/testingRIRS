import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import "@testing-library/jest-dom";
import InvoiceTable from "../src/pages/InvoicesPage/Table/InvoiceTable";
import axios from "axios";

vi.mock("axios");

describe("InvoiceTable Component", () => {
  it("renders the invoice table with headers", async () => {
    (axios.get as vi.Mock).mockResolvedValueOnce({ data: 1 }); // Mock total pages
    (axios.get as vi.Mock).mockResolvedValueOnce({ data: [] }); // Mock invoices

    render(<InvoiceTable />);

    // Wait for headers to render
    await waitFor(() => {
      expect(screen.getByText("Naziv")).toBeInTheDocument();
      expect(screen.getByText("Znesek")).toBeInTheDocument();
    });
  });

  it("loads and displays invoices", async () => {
    const mockInvoices = [
      {
        _id: "1",
        name: "Invoice 1",
        amount: 100,
        date: "2024-01-01T00:00:00Z",
        dueDate: "2024-01-10T00:00:00Z",
        payer: "John Doe",
        statusSent: true,
        statusPaid: false,
      },
    ];

    (axios.get as vi.Mock)
      .mockResolvedValueOnce({ data: 1 }) // Mock total pages
      .mockResolvedValueOnce({ data: mockInvoices }); // Mock invoices

    render(<InvoiceTable />);

    // Wait for invoices to load
    await waitFor(() => {
      expect(screen.getByText("Invoice 1")).toBeInTheDocument();
      expect(screen.getByText("100 €")).toBeInTheDocument();
    });
  });
});
