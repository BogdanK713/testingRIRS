import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import InvoicesPage from "../src/pages/InvoicesPage/InvoicesPage";

describe("InvoicesPage", () => {
  it("renders the page title", () => {
    render(
      <MemoryRouter>
        <InvoicesPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Računi")).toBeInTheDocument();
  });

  it("renders the ExportInvoices component", () => {
    render(
      <MemoryRouter>
        <InvoicesPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Izvozi račune")).toBeInTheDocument();
  });
});
