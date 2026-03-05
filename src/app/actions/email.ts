'use server';

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
    console.log('Attempting to send via PHP API...')

    const response = await fetch('https://api.papatiger.tech/send-mail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: 'papatiger2024secret',
        subject,
        html: htmlContent,
        replyTo: data.email
      })
    });

    const result = await response.json();
    console.log('PHP API response:', result)

    if (result.success) {
      console.log('Email sent successfully!')
      return { success: true };
    } else {
      console.error('PHP API error:', result.error)
      return { success: false, error: result.error };
    }

  } catch (error: any) {
    console.error("Email Error:", error.message);
    return { success: false, error: error.message };
  }
}