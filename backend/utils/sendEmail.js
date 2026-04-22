// ============================================================
// utils/sendEmail.js  ← NEW FILE
// Nodemailer email utility — sends booking & cancel emails
// Called from bookingController.js after create/delete
// ============================================================

const nodemailer = require("nodemailer");

// ── Gmail SMTP Transporter ───────────────────────────────────
// This is the "email account" that sends all emails
const transporter = nodemailer.createTransport({
  service: "gmail",                      // Use Gmail SMTP service
  auth: {
    user: process.env.EMAIL_USER,        // Gmail address from .env
    pass: process.env.EMAIL_PASS,        // Gmail App Password from .env
  },
});

// ── 1. Booking Confirmation Email ────────────────────────────
// Called after a new booking is created successfully
const sendBookingConfirmationEmail = async (toEmail, bookingDetails) => {
  const { name, destination, date, persons, price, status } = bookingDetails;

  // Beautiful HTML email template
  const htmlContent = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#0d6efd,#0dcaf0);padding:30px;text-align:center;">
        <h1 style="color:white;margin:0;">TravelEase</h1>
        <p style="color:#e0f0ff;margin:5px 0 0;">Your Trip is Confirmed!</p>
      </div>
      <div style="padding:30px;background:#ffffff;">
        <h2 style="color:#333;">Hello, ${name}!</h2>
        <p style="color:#555;font-size:16px;">Your booking has been <strong style="color:#198754;">confirmed successfully</strong>.</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <tr style="background:#f8f9fa;">
            <td style="padding:12px 15px;font-weight:bold;color:#555;border-bottom:1px solid #dee2e6;">Destination</td>
            <td style="padding:12px 15px;color:#333;border-bottom:1px solid #dee2e6;">${destination}</td>
          </tr>
          <tr>
            <td style="padding:12px 15px;font-weight:bold;color:#555;border-bottom:1px solid #dee2e6;">Travel Date</td>
            <td style="padding:12px 15px;color:#333;border-bottom:1px solid #dee2e6;">${new Date(date).toDateString()}</td>
          </tr>
          <tr style="background:#f8f9fa;">
            <td style="padding:12px 15px;font-weight:bold;color:#555;border-bottom:1px solid #dee2e6;">Persons</td>
            <td style="padding:12px 15px;color:#333;border-bottom:1px solid #dee2e6;">${persons}</td>
          </tr>
          <tr>
            <td style="padding:12px 15px;font-weight:bold;color:#555;border-bottom:1px solid #dee2e6;">Total Price</td>
            <td style="padding:12px 15px;color:#198754;font-weight:bold;border-bottom:1px solid #dee2e6;">Rs.${Number(price).toLocaleString()}</td>
          </tr>
          <tr style="background:#f8f9fa;">
            <td style="padding:12px 15px;font-weight:bold;color:#555;">Status</td>
            <td style="padding:12px 15px;"><span style="background:#d1e7dd;color:#0a3622;padding:4px 12px;border-radius:20px;font-weight:bold;">${status}</span></td>
          </tr>
        </table>
        <div style="background:#e8f4fd;border-left:4px solid #0d6efd;padding:15px;border-radius:5px;margin:20px 0;">
          <strong style="color:#0d6efd;">Important Notes:</strong>
          <ul style="color:#555;margin:10px 0 0;padding-left:20px;">
            <li>Carry a valid government ID proof</li>
            <li>Report 2 hours before scheduled departure</li>
            <li>Support: support@travelease.com | +91 9876543210</li>
          </ul>
        </div>
        <p style="color:#555;">Have a wonderful trip!</p>
        <p style="color:#555;">Warm regards,<br/><strong>Team TravelEase</strong></p>
      </div>
      <div style="background:#1a1a2e;padding:15px;text-align:center;">
        <p style="color:#aaa;margin:0;font-size:13px;">2024 TravelEase | support@travelease.com</p>
      </div>
    </div>
  `;

  // Send the email using Gmail SMTP
  await transporter.sendMail({
    from: `"TravelEase" <${process.env.EMAIL_USER}>`,  // sender
    to: toEmail,                                        // user's email
    subject: `Booking Confirmed - ${destination} | TravelEase`,
    html: htmlContent,
  });

  console.log(`Email sent to: ${toEmail}`);
};

// ── 2. Booking Cancellation Email ────────────────────────────
// Called after a booking is deleted/cancelled
const sendCancellationEmail = async (toEmail, bookingDetails) => {
  const { name, destination } = bookingDetails;

  const htmlContent = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#dc3545,#ff6b6b);padding:30px;text-align:center;">
        <h1 style="color:white;margin:0;">TravelEase</h1>
        <p style="color:#ffe0e0;margin:5px 0 0;">Booking Cancellation Notice</p>
      </div>
      <div style="padding:30px;background:#ffffff;">
        <h2 style="color:#333;">Hello, ${name}!</h2>
        <p style="color:#555;font-size:16px;">Your booking for <strong>${destination}</strong> has been <strong style="color:#dc3545;">cancelled successfully</strong>.</p>
        <div style="background:#f8d7da;border-left:4px solid #dc3545;padding:20px;border-radius:5px;margin:20px 0;">
          <h3 style="color:#842029;margin:0 0 10px;">Booking Cancelled</h3>
          <p style="color:#842029;margin:0;">Your trip to <strong>${destination}</strong> has been cancelled as requested.</p>
        </div>
        <div style="background:#fff3cd;border-left:4px solid #ffc107;padding:15px;border-radius:5px;margin:20px 0;">
          <strong style="color:#664d03;">Refund Info:</strong>
          <p style="color:#664d03;margin:8px 0 0;">Refunds are processed within 5-7 business days. Contact: support@travelease.com</p>
        </div>
        <p style="color:#555;">We hope to welcome you back soon!</p>
        <p style="color:#555;">Warm regards,<br/><strong>Team TravelEase</strong></p>
      </div>
      <div style="background:#1a1a2e;padding:15px;text-align:center;">
        <p style="color:#aaa;margin:0;font-size:13px;">2024 TravelEase | support@travelease.com</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"TravelEase" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Booking Cancelled - ${destination} | TravelEase`,
    html: htmlContent,
  });

  console.log(`Cancellation email sent to: ${toEmail}`);
};

module.exports = { sendBookingConfirmationEmail, sendCancellationEmail };