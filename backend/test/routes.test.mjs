import { describe, it, expect } from "vitest";
import fetch from "node-fetch";

describe("API Routes", () => {
  it("should fetch all documents", async () => {
    const res = await fetch("https://testingiris.onrender.com/db/all");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  it("should add a new document", async () => {
    const res = await fetch("https://testingiris.onrender.com/db/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test Doc", content: "Test Content" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  it("should fetch paginated documents", async () => {
    const res = await fetch("https://testingiris.onrender.com/db/all/1");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeLessThanOrEqual(5); // Assuming a limit of 5 per page
  });

  it("should return the number of pages", async () => {
    const res = await fetch("https://testingiris.onrender.com/db/pages");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body).toBe("number");
    expect(body).toBeGreaterThanOrEqual(1); // At least one page
  });

  it("should delete a document by ID", async () => {
    // First, create a document to delete
    const addRes = await fetch("https://testingiris.onrender.com/db/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Delete Me", content: "To be deleted" }),
    });
    const addedDoc = await addRes.json();

    // Then, delete the document
    const delRes = await fetch(
      `https://testingiris.onrender.com/db/delete/${addedDoc.id}/${addedDoc.rev}`,
      { method: "DELETE" }
    );
    expect(delRes.status).toBe(200);
    const delBody = await delRes.json();
    expect(delBody.message).toBe("Document deleted successfully");
  });

  it("should fail to delete a document with an invalid ID", async () => {
    const res = await fetch("https://testingiris.onrender.com/db/delete/invalid-id", {
      method: "DELETE",
    });
    expect(res.status).toBe(500); // Assuming 500 for invalid operations
    const body = await res.json();
    expect(body.error).toContain("Failed to delete document");
  });

  it("should update a document by ID", async () => {
    // First, create a document to update
    const addRes = await fetch("https://testingiris.onrender.com/db/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Old Title", content: "Old Content" }),
    });
    const addedDoc = await addRes.json();

    // Then, update the document
    const updateRes = await fetch(
      `https://testingiris.onrender.com/db/update/${addedDoc.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Updated Title", content: "Updated Content" }),
      }
    );
    expect(updateRes.status).toBe(200);
    const updateBody = await updateRes.json();
    expect(updateBody.message).toBe("Document updated successfully");
  });
  it("should simulate email sending", async () => {
    const res = await fetch("https://testingiris.onrender.com/db/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payerName: "John Doe",
        payerEmail: "john.doe@example.com",
        message: "Hello, this is a test message.",
      }),
    });
  
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe("Email simulated successfully!");
  });
  
  it("should return an error for missing fields", async () => {
    const res = await fetch("https://testingiris.onrender.com/db/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payerName: "John Doe",
        payerEmail: "", // Missing email
        message: "Hello, this is a test message.",
      }),
    });
  
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("All fields are required.");
  });
  
});
