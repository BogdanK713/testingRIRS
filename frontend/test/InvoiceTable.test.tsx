import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import InvoiceTable from "../src/pages/InvoicesPage/Table/InvoiceTable";
import axios from "axios";

// Mock axios
vi.mock("axios");
const mockedAxios = axios as vi.Mocked<typeof axios>;

describe("InvoiceTable Component", () => {
  it("renders the table with headers", () => {
    render(<InvoiceTable />);

    // Assert that the table headers render correctly
    expect(screen.getByText("Naziv")).toBeInTheDocument();
    expect(screen.getByText("Znesek")).toBeInTheDocument();
    expect(screen.getByText("Datum izdaje")).toBeInTheDocument();
    expect(screen.getByText("Rok plačila")).toBeInTheDocument();
  });

  it("displays 'No invoices found' message when no invoices exist", async () => {
    // Mock Axios responses
    mockedAxios.get.mockResolvedValueOnce({ data: 1 }); // Mock total pages
    mockedAxios.get.mockResolvedValueOnce({ data: [] }); // Mock no invoices

    render(<InvoiceTable />);

    // Wait for "No invoices found" to appear
    const noInvoicesMessage = await screen.findByText("No invoices found.");
    expect(noInvoicesMessage).toBeInTheDocument();
  });
});
