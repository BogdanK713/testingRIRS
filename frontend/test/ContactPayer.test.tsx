import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import ContactPayer from "../src/pages/InvoicesPage/ContactPayer";

describe("ContactPayer Component", () => {
    it("renders the form title", () => {
        render(<ContactPayer />);
        expect(screen.getByText("Contact Payer")).toBeInTheDocument();
    });

    it("renders the payer name input", () => {
        render(<ContactPayer />);
        expect(screen.getByLabelText(/Payer Name:/i)).toBeInTheDocument();
    });

    it("renders the payer email input", () => {
        render(<ContactPayer />);
        expect(screen.getByLabelText(/Payer Email:/i)).toBeInTheDocument();
    });

    it("renders the message textarea", () => {
        render(<ContactPayer />);
        expect(screen.getByLabelText(/Message:/i)).toBeInTheDocument();
    });

    it("renders the Send Message button", () => {
        render(<ContactPayer />);
        expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
    });
});
