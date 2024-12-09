import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import ExportInvoices from "../src/pages/InvoicesPage/ExportInvoices";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("ExportInvoices Component", () => {
  // Mock `window.alert`
  beforeEach(() => {
    global.alert = vi.fn();
    global.URL.createObjectURL = vi.fn(() => "mockObjectURL"); // Mock `createObjectURL`
  });

  it("renders the export button", () => {
    render(<ExportInvoices />);
    const button = screen.getByRole("button", { name: /izvozi račune/i });
    expect(button).toBeInTheDocument();
  });

  it("triggers export invoices successfully", async () => {
    const mockOnExportSuccess = vi.fn();
    (axios.get as vi.Mock).mockResolvedValueOnce({
      data: "mockBlobData",
    });

    render(<ExportInvoices onExportSuccess={mockOnExportSuccess} />);
    const button = screen.getByRole("button", { name: /izvozi račune/i });

    fireEvent.click(button);

    // Wait for success callback to be called
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnExportSuccess).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith("Invoices exported successfully!");
  });

  it("handles export invoices error", async () => {
    const mockOnExportError = vi.fn();
    (axios.get as vi.Mock).mockRejectedValueOnce(new Error("Export failed"));

    render(<ExportInvoices onExportError={mockOnExportError} />);
    const button = screen.getByRole("button", { name: /izvozi račune/i });

    fireEvent.click(button);

    // Wait for error callback to be called
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnExportError).toHaveBeenCalledWith(new Error("Export failed"));
    expect(global.alert).toHaveBeenCalledWith("Failed to export invoices.");
  });

  it("calls axios.get with correct URL and responseType", async () => {
    (axios.get as vi.Mock).mockResolvedValueOnce({
      data: "mockBlobData",
    });

    render(<ExportInvoices />);
    const button = screen.getByRole("button", { name: /izvozi račune/i });

    fireEvent.click(button);

    // Wait for axios to be called
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/db/export", {
      responseType: "blob",
    });
  });
});
