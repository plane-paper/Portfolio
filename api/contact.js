import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'noreply@richardsu.org',
      to: 'r38su@uwaterloo.ca',
      subject: `${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend rejected contact email:', error);
      return res.status(502).json({
        error: {
          name: error.name,
          message: error.message,
          statusCode: error.statusCode,
        },
      });
    }

    console.info('Contact email sent:', data?.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({
      error: {
        message: err instanceof Error ? err.message : 'Unexpected email service error',
      },
    });
  }
}
