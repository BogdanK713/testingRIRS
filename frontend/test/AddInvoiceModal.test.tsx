import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import AddInvoiceModal from "../src/pages/InvoicesPage/AddInvoiceModal";

vi.mock("axios");

describe("AddInvoiceModal", () => {
  it("renders modal when show is true", () => {
    render(
      <AddInvoiceModal
        show={true}
        onClose={vi.fn()}
        onSaveSuccess={vi.fn()}
      />
    );
    expect(screen.getByText("Dodaj nov račun")).toBeInTheDocument();
  });

  it("closes modal on 'Zapri' button click", () => {
    const onCloseMock = vi.fn();
    render(
      <AddInvoiceModal
        show={true}
        onClose={onCloseMock}
        onSaveSuccess={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText("Zapri"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  // Simple test to check if modal footer renders properly
  it("renders modal footer buttons", () => {
    render(
      <AddInvoiceModal
        show={true}
        onClose={vi.fn()}
        onSaveSuccess={vi.fn()}
      />
    );

    expect(screen.getByText("Shrani")).toBeInTheDocument();
    expect(screen.getByText("Zapri")).toBeInTheDocument();
  });

  // Simple test to check if modal does not render when show is false
  it("does not render modal when show is false", () => {
    render(
      <AddInvoiceModal
        show={false}
        onClose={vi.fn()}
        onSaveSuccess={vi.fn()}
      />
    );

    expect(screen.queryByText("Dodaj nov račun")).not.toBeInTheDocument();
  });
});
