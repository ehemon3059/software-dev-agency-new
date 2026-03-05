'use server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // try {
  //   await resend.emails.send({
  //     from: 'PapaTiger <hello@papatiger.tech>',
  //     to: 'hello@papatiger.tech',
  //     replyTo: data.email,
  //     subject: subject,
  //     html: htmlContent,
  //   });

  //   return { success: true };
  // } catch (error: any) {
  //   console.error("Email Error:", error.message);
  //   return { success: false, error: error.message };
  // }

  try {
  console.log('Attempting to send with Resend...')
  console.log('API Key exists:', !!process.env.RESEND_API_KEY)
  
  await resend.emails.send({
    from: 'PapaTiger <hello@papatiger.tech>',
    to: 'no.one3059@gmail.com',
    replyTo: data.email,
    subject: subject,
    html: htmlContent,
  });

  console.log('Email sent successfully!')
  return { success: true };
} catch (error: any) {
  console.error("Email Error:", error.message);
  return { success: false, error: error.message };
}
}