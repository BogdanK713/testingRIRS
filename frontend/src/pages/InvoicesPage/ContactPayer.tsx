import React, { useState } from "react";
import "./ContactPayer.css";

const ContactPayer: React.FC = () => {
    const [payerName, setPayerName] = useState("");
    const [payerEmail, setPayerEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // Show loading state

        try {
            const response = await fetch("http://localhost:3000/db/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payerName, payerEmail, message }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || "Failed to send message");
            }

            setSubmitted(true);
            setPayerName("");
            setPayerEmail("");
            setMessage("");
        } catch (err) {
            console.error(err);
            setError((err as Error).message || "Failed to send message");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="contact-payer-container">
            <h2>Contact Payer</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="payerName">Payer Name:</label>
                    <input
                        type="text"
                        id="payerName"
                        value={payerName}
                        onChange={(e) => setPayerName(e.target.value)}
                        placeholder="Enter payer's name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="payerEmail">Payer Email:</label>
                    <input
                        type="email"
                        id="payerEmail"
                        value={payerEmail}
                        onChange={(e) => setPayerEmail(e.target.value)}
                        placeholder="Enter payer's email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message here"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>

            {submitted && !error && (
                <p className="success-message" role="alert">
                    Message sent successfully!
                </p>
            )}
            {error && (
                <p className="error-message" role="alert">
                    Error: {error}
                </p>
            )}
        </div>
    );
};

export default ContactPayer;
