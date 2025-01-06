const express = require("express");
const {
  addDocument,
  addDocumentsList,
  getAllDocuments,
  deleteDocument,
  deleteDocumentById,
  updateDocument,
  destroy,
} = require("../src/pouchdb");
require("dotenv").config();

const router = express.Router();

// Handle OPTIONS requests for all routes
router.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://testing-rirs-d4ebz6fml-bogdans-projects-10589c63.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

// Health check for /db
router.get("/", (req, res) => {
  res.status(200).send("DB routes are operational!");
});

// Route to export all invoices
router.get("/export", async (req, res) => {
  try {
    const response = await getAllDocuments();
    const invoices = response.rows.map((row) => row.doc);
    res.setHeader("Content-Disposition", "attachment; filename=invoices.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(invoices, null, 2));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a document
router.post("/add", async (req, res) => {
  try {
    const doc = req.body;
    const response = await addDocument(doc);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add multiple documents
router.post("/addList", async (req, res) => {
  try {
    const docs = req.body;
    const response = await addDocumentsList(docs);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all documents
router.get("/all", async (req, res) => {
  try {
    const response = await getAllDocuments();
    res.json(response.rows.map((row) => row.doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get paginated documents
router.get("/all/:page", async (req, res) => {
  try {
    const response = await getAllDocuments();
    const totalPages = Math.ceil(response.total_rows / 5);

    let startingIndex = (req.params.page - 1) * 5;
    let items = 5;

    if (req.params.page === totalPages) items = response.total_rows % 5;

    const data = response.rows.slice(startingIndex, startingIndex + items);
    res.json(data.map((row) => row.doc));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete document by ID and rev
router.delete("/delete/:id/:rev", async (req, res) => {
  const { id, rev } = req.params;
  try {
    const response = await deleteDocument(id, rev);
    res.json({ message: "Document deleted successfully", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a document by only `_id`
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteDocumentById(id);
    res.json({ message: "Document deleted successfully", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a document by `_id`
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const response = await updateDocument(id, newData);
    res.json({ message: "Document updated successfully", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get number of pages
router.get("/pages", async (req, res) => {
  try {
    const response = await getAllDocuments();
    res.json(Math.ceil(response.total_rows / 5));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wipe entire database
router.get("/wipe", async (req, res) => {
  try {
    await destroy();
    res.status(200).json({ message: "Database wiped successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle contact form
router.post("/contact", async (req, res) => {
  const { payerName, payerEmail, message } = req.body;

  if (!payerName || !payerEmail || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    console.log(`Simulating email to: ${payerEmail}`);
    console.log(`Message: ${message}`);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.status(200).json({ message: "Email simulated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to simulate email." });
  }
});

// Route to fetch overdue invoices
router.get("/overdue", async (req, res) => {
  try {
    const response = await getAllDocuments();
    const currentDate = new Date();
    const overdueInvoices = response.rows
      .map((row) => row.doc)
      .filter((invoice) => invoice.dueDate && new Date(invoice.dueDate) < currentDate && !invoice.statusPaid);

    res.json(overdueInvoices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch overdue invoices" });
  }
});

module.exports = router;
