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
const nodemailer = require("nodemailer")
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Outlook SMTP server
    port: 587, // Port number
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER, // Your Outlook email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Configuration Error:", error);
    } else {
        console.log("SMTP Server is ready:", success);
    }
});
const router = express.Router();

// Route to export all invoices
router.get("/export", async (req, res) => {
    try {
        const response = await getAllDocuments();
        const invoices = response.rows.map((row) => row.doc); // Extract all invoice data
        res.setHeader("Content-Disposition", "attachment; filename=invoices.json");
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(invoices, null, 2)); // Send JSON file
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

// Route to add a document
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

// Route to get all documents
router.get("/all/:page", async (req, res) => {
	try {
		const response = await getAllDocuments();

		const totalPages = (response.total_rows % 5) + 1;

		let startingIndex = (req.params.page - 1) * 5;
		let items = 5;

    if (req.params.page === totalPages) items = response.total_rows % 5;

    const data = response.rows.slice(startingIndex, startingIndex + items);
		res.json(data.map((row) => row.doc));
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Route to delete document
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
	//should only owner be able to update this? if so then wee need to add a check here!!
	const { id } = req.params;
	const newData = req.body; // Get the new data from request body

	try {
		const response = await updateDocument(id, newData);
		res.json({ message: "Document updated successfully", response });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//get number of pages
router.get("/pages", async (req, res) => {
	try {
		const response = await getAllDocuments();
		res.json(Math.ceil(response.total_rows / 5));
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//wipe entire DB
router.get("/wipe", async (req, res) => {
	try {
		await destroy();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
router.post("/contact", async (req, res) => {
    const { payerName, payerEmail, message } = req.body;

    // Validate incoming data
    if (!payerName || !payerEmail || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Simulate email sending by logging to the console
        console.log("Simulating email send...");
        console.log(`To: ${payerEmail}`);
        console.log(`Subject: Message from ${payerName}`);
        console.log(`Message: ${message}`);

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        res.status(200).json({ message: "Email simulated successfully!" });
    } catch (error) {
        console.error("Error simulating email:", error);
        res.status(500).json({ error: "Failed to simulate email." });
    }
});

module.exports = router;
