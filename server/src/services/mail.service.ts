import nodemailer from "nodemailer";

export async function sendContactEmail(
  senderName: string,
  senderEmail: string,
  messageText: string
): Promise<boolean> {
  try {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.EMAIL_USER || "";
    const pass = process.env.EMAIL_PASS || "";
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || user;

    if (!user || !pass) {
      console.warn("Nodemailer SMTP user or password not set. Simulating mail send.");
      return true;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const mailOptions = {
      from: `"${senderName}" <${senderEmail}>`,
      to: receiver,
      subject: `⚡ New Portfolio Message from ${senderName}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #00f0ff;">
          ${messageText}
        </blockquote>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✔ Notification email sent successfully to ${receiver}`);
    return true;
  } catch (error) {
    console.error("Nodemailer Mail delivery failed:", error);
    return false;
  }
}
