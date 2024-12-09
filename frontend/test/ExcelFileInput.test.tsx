import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ExcelFileInput from "../src/pages/InvoicesPage/ExcelImporter/ExcelImporter";

describe("ExcelFileInput Component", () => {
  it("renders the import button", () => {
    render(<ExcelFileInput importInvoices={vi.fn()} />);
    expect(screen.getByRole("button", { name: /Uvozna predloga/i })).toBeInTheDocument();
  });

  it("renders the file input", () => {
    render(<ExcelFileInput importInvoices={vi.fn()} />);
    expect(screen.getByPlaceholderText("Uvoz računov")).toBeInTheDocument();
  });
});
