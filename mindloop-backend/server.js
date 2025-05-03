const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { email, selectedType, message } = req.body;

  if (!email || !selectedType || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email tebi (MindLoopAI)
    await transporter.sendMail({
      from: `"MindLoopAI Website" <${process.env.EMAIL_USER}>`,
      to: "mindloopai@gmail.com",
      subject: `New Inquiry - ${selectedType}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${selectedType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Potvrda klijentu
    await transporter.sendMail({
      from: `"MindLoopAI Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message – MindLoopAI",
      html: `
        <p>Hi,</p>
        <p>Thank you for contacting <strong>MindLoopAI</strong>. We’ve received your message and will get back to you as soon as possible.</p>
        <p><em>Your request:</em></p>
        <blockquote>${message}</blockquote>
        <p>— The MindLoopAI Team</p>
      `
    });

    console.log("✅ Both emails sent");
    res.status(200).json({ success: true });

  } catch (err) {
    console.error("❌ Email sending failed:", err);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
