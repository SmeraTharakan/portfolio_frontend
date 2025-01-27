import React, { useState } from "react";
import { sendMessage } from "../../api/Api"; // Assuming you create this API call to POST contact messages
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the contact form data to the backend API
      await sendMessage({ name, email, message });
      setSuccessMessage("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setMessage("");

      // Automatically clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setSuccessMessage("Error sending message. Please try again.");

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact</h2>
      <div className="connect-with-me-title">Connect with Me</div>
      <div className="contact-description">
        If you want to know more about me or my work, or if you would just
        like to say hello, send me a message. I'd love to hear from you.
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default Contact;
