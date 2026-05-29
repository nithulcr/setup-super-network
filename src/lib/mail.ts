import nodemailer from "nodemailer";
import { ContactFormData } from "@/types/contact";

const getTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const generateEnquiryId = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SSN-${date}-${random}`;
};

const commonStyles = `
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 20px auto; padding: 0; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
  .header { background: #000; color: #fff; padding: 32px 20px; text-align: center; }
  .content { padding: 32px 24px; background: #ffffff; }
  .footer { font-size: 12px; color: #9ca3af; text-align: center; padding: 24px; background: #f9fafb; border-top: 1px solid #e5e7eb; }
  .detail-box { background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 20px; margin: 20px 0; }
  .detail-row { margin-bottom: 12px; display: flex; }
  .label { font-weight: 600; color: #64748b; min-width: 120px; display: inline-block; }
  .value { color: #1e293b; }
  .enquiry-id { background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 9999px; font-family: monospace; font-weight: 700; font-size: 14px; }
  .button { display: inline-block; background: #2563eb; color: #ffffff !important; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 20px; }
`;

export const getAdminEmailTemplate = (data: ContactFormData, enquiryId: string) => {
  const now = new Date().toLocaleString();
  return `
    <html>
      <head><style>${commonStyles}</style></head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0; font-size: 24px;">New Service Enquiry</h1>
          </div>
          <div class="content">
            <p>You have received a new enquiry from the <strong>Setup Super Network</strong> contact form.</p>
            <div class="detail-box">
              <div class="detail-row"><span class="label">Enquiry ID:</span> <span class="enquiry-id">${enquiryId}</span></div>
              <div class="detail-row"><span class="label">Full Name:</span> <span class="value">${data.fullName}</span></div>
              <div class="detail-row"><span class="label">Email:</span> <span class="value">${data.email}</span></div>
              <div class="detail-row"><span class="label">Phone:</span> <span class="value">${data.phone}</span></div>
              <div class="detail-row"><span class="label">Service:</span> <span class="value">${data.service}</span></div>
              <div class="detail-row"><span class="label">Submitted:</span> <span class="value">${now}</span></div>
            </div>
            <div style="margin-top: 24px;">
              <span class="label">Message:</span>
              <p style="white-space: pre-wrap; background: #ffffff; border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px; color: #334155;">${data.message}</p>
            </div>
          </div>
          <div class="footer">
            Sent via SSN Automated System &bull; ${new Date().getFullYear()} Setup Super Network
          </div>
        </div>
      </body>
    </html>
  `;
};

export const getClientEmailTemplate = (data: ContactFormData, enquiryId: string) => {
  return `
    <html>
      <head><style>${commonStyles}</style></head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0; font-size: 24px;">We've Received Your Enquiry</h1>
          </div>
          <div class="content">
            <p>Dear ${data.fullName},</p>
            <p>Thank you for reaching out to <strong>Setup Super Network</strong>. This email confirms that we have received your request, and our technical team is currently reviewing it.</p>
            
            <div class="detail-box">
              <p style="margin-top:0; font-weight: 600; color: #1e293b;">Reference Details:</p>
              <div class="detail-row"><span class="label">Enquiry ID:</span> <span class="enquiry-id">${enquiryId}</span></div>
              <div class="detail-row"><span class="label">Service:</span> <span class="value">${data.service}</span></div>
            </div>

            <p><strong>What's next?</strong></p>
            <p>One of our specialists will contact you at <strong>${data.email}</strong> or <strong>${data.phone}</strong> within the next 24 business hours to discuss your requirements in detail.</p>
            
            <a href="https://setupsupernetwork.com" class="button">Visit Our Website</a>
          </div>
          <div class="footer">
            This is an automated confirmation of your enquiry. Please do not reply to this email.<br />
            &copy; ${new Date().getFullYear()} Setup Super Network. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;
};

export const sendContactEmails = async (data: ContactFormData, enquiryId: string) => {
  const transporter = getTransporter();
  
  const adminMailOptions = {
    from: `"SSN System" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New Enquiry [${enquiryId}] - ${data.fullName}`,
    html: getAdminEmailTemplate(data, enquiryId),
  };

  const clientMailOptions = {
    from: `"Setup Super Network" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: `Enquiry Received: ${enquiryId}`,
    html: getClientEmailTemplate(data, enquiryId),
  };

  console.log(`Dispatched emails for Enquiry ${enquiryId}`);
  
  // Send both concurrently
  const [adminResult, clientResult] = await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(clientMailOptions)
  ]);

  console.log(`Admin email sent: ${adminResult.messageId}`);
  console.log(`Client email sent: ${clientResult.messageId}`);
};
