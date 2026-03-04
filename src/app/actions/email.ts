'use server';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false  // ← this fixes the certificate error
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});

export async function sendEmailAction(data: any, type: 'inquiry' | 'consultation') {
  const subject = type === 'inquiry' 
    ? `🚀 New Project Inquiry: ${data.name}` 
    : `📅 Consultation Request: ${data.name}`;

  const htmlContent = type === 'inquiry' 
    ? `
      <h2>New Project Inquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Service:</strong> ${data.service}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `
    : `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Topic:</strong> ${data.topic}</p>
      <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
      <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
      <p><strong>Notes:</strong> ${data.additionalNotes || 'None'}</p>
    `;

  try {
    // Test connection first
    await transporter.verify()
    console.log('SMTP connection verified ✅')

    await transporter.sendMail({
      from: `"PapaTiger" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: data.email,
      subject: subject,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Email Error:", error.message);
    return { success: false, error: error.message };
  }
}