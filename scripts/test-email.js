const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function testEmail() {
  console.log("--- SMTP Test Script ---");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("NOTIFICATION_EMAIL:", process.env.NOTIFICATION_EMAIL);
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Error: EMAIL_USER or EMAIL_PASS not found in .env.local");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log("Verifying connection...");
    await transporter.verify();
    console.log("Connection verified successfully!");

    console.log("Sending test email...");
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: "SMTP Test Email",
      text: "This is a test email from the Setup Super Network debug script.",
      html: "<b>This is a test email from the Setup Super Network debug script.</b>",
    });

    console.log("Test email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("SMTP Test Failed:", error);
  }
}

testEmail();
