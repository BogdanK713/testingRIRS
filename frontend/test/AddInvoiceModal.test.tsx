import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import AddInvoiceModal from "../src/pages/InvoicesPage/AddInvoiceModal";

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

  it("calls onSaveSuccess when invoice is saved", async () => {
    const onSaveMock = vi.fn();
    render(
      <AddInvoiceModal
        show={true}
        onClose={vi.fn()}
        onSaveSuccess={onSaveMock}
      />
    );

    fireEvent.change(screen.getByLabelText("Naziv računa"), {
      target: { value: "Test Invoice" },
    });

    fireEvent.click(screen.getByText("Shrani"));
    await waitFor(() => expect(onSaveMock).toHaveBeenCalledTimes(1));
  });
});
