import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import axios from "axios";
import InvoicesPage from "../src/pages/InvoicesPage/InvoicesPage";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock axios
vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Overdue Invoices Modal Functionality", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset(); // Reset mocks before each test
  });

  // Test 1: Renders the "View Overdue Invoices" button
  it("renders the 'View Overdue Invoices' button", () => {
    render(<InvoicesPage />);
    expect(screen.getByText(/View Overdue Invoices/i)).toBeInTheDocument();
  });

  // Test 2: Fetches and displays overdue invoices in the modal
  it("fetches and displays overdue invoices when the button is clicked", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Invoice 1", amount: 100, dueDate: "2024-12-01" },
        { id: 2, name: "Invoice 2", amount: 200, dueDate: "2024-11-30" },
      ],
    });

    render(<InvoicesPage />);

    await act(async () => {
      fireEvent.click(screen.getByText(/View Overdue Invoices/i));
    });

    expect(screen.getByText(/Invoice 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Invoice 2/i)).toBeInTheDocument();
  });

  // Test 3: Ensures modal opens when the button is clicked
  it("opens the modal when the 'View Overdue Invoices' button is clicked", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Invoice 1", amount: 100, dueDate: "2024-12-01" },
      ],
    });

    render(<InvoicesPage />);

    await act(async () => {
      fireEvent.click(screen.getByText(/View Overdue Invoices/i));
    });

    expect(screen.getByText(/Overdue Invoices/i)).toBeInTheDocument();
  });

  // Test 4: Keeps the modal open after data is displayed
  it("keeps the modal open after data is displayed", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Invoice 1", amount: 100, dueDate: "2024-12-01" },
      ],
    });

    render(<InvoicesPage />);

    await act(async () => {
      fireEvent.click(screen.getByText(/View Overdue Invoices/i));
    });

    expect(screen.getByText(/Invoice 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Overdue Invoices/i)).toBeInTheDocument();
  });

  // Test 5: Displays a loading message while fetching data
  it("displays a loading message while fetching overdue invoices", async () => {
    mockedAxios.get.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ data: [{ id: 1, name: "Invoice 1", amount: 100, dueDate: "2024-12-01" }] }),
            500
          )
        )
    );

    render(<InvoicesPage />);

    await act(async () => {
      fireEvent.click(screen.getByText(/View Overdue Invoices/i));
    });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Invoice 1/i)).toBeInTheDocument());
  });

});
