// backend/utils/mailer.js
import nodemailer from "nodemailer";

export function getTransporter() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP env vars are missing");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE || "false") === "true", // true = port 465, false = 587/2525
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendReceiptEmail({ to, items, total, sessionId }) {
  const from = process.env.SMTP_FROM || "Belmio Pizza <no-reply@belmio.demo>";
  const frontend = process.env.FRONTEND_URL || "http://localhost:3000";

  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px;border:1px solid #eee">${i.description}</td>
        <td style="padding:8px;border:1px solid #eee;text-align:center">${i.quantity}</td>
        <td style="padding:8px;border:1px solid #eee;text-align:right">LKR ${Number(i.amount).toLocaleString()}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif">
      <h2>Belmio Pizza – Payment Receipt (Demo)</h2>
      <p>Thanks for your order! Below is a summary.</p>
      <table style="border-collapse:collapse;margin-top:12px">
        <thead>
          <tr>
            <th style="padding:8px;border:1px solid #eee;text-align:left">Item</th>
            <th style="padding:8px;border:1px solid #eee;text-align:center">Qty</th>
            <th style="padding:8px;border:1px solid #eee;text-align:right">Amount</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:8px;border:1px solid #eee;text-align:right;font-weight:bold">Total</td>
            <td style="padding:8px;border:1px solid #eee;text-align:right;font-weight:bold">LKR ${Number(total).toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
      <p style="margin-top:12px">
        Session: ${sessionId} • <a href="${frontend}/">Back to Belmio Pizza</a>
      </p>
      <p style="color:#888">This email was sent from the Belmio demo server.</p>
    </div>`;

  const transporter = getTransporter();

  await transporter.sendMail({
    from,
    to,
    subject: "Belmio Pizza – Receipt (Demo)",
    html,
  });
}
