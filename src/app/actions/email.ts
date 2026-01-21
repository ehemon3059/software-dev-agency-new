'use server';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
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
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: subject,
      html: htmlContent,
    });
    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false };
  }
}