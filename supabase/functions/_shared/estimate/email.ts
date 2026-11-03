import { EmailAPIError, sendLovableEmail } from "npm:@lovable.dev/email-js@0.4.0";

const SENDER_DOMAIN = "notify.crystalwaterpoolsinga.com";
const FROM_ADDRESS = `Crystal Water Pools <noreply@${SENDER_DOMAIN}>`;
const TO_ADDRESS = "crystalwaterpoolsinga@gmail.com";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  message: string;
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(p: ContactPayload): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px;background:#f6f8fa;font-weight:600;width:140px;border:1px solid #e5e7eb;">${label}</td>
      <td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td>
    </tr>`;
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#ffffff;color:#111;padding:24px;">
    <h2 style="margin:0 0 16px;">New estimate request</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      ${row("Name", p.name)}
      ${row("Email", p.email)}
      ${row("Phone", p.phone)}
      ${row("Address", p.address)}
      ${row("Zip", p.zip)}
    </table>
    <h3 style="margin:24px 0 8px;">Project details</h3>
    <p style="white-space:pre-wrap;background:#f6f8fa;padding:12px;border:1px solid #e5e7eb;border-radius:6px;max-width:600px;">${escapeHtml(p.message)}</p>
    <p style="color:#6b7280;font-size:12px;margin-top:24px;">Sent from crystalwaterpoolsinga.com contact form.</p>
  </body></html>`;
}

function buildText(p: ContactPayload): string {
  return `New estimate request

Name: ${p.name}
Email: ${p.email}
Phone: ${p.phone}
Address: ${p.address}
Zip: ${p.zip}

Project details:
${p.message}
`;
}


export type SendResult = { ok: true } | { ok: false; code: string; error: string };

/** Sends the owner notification for one stored estimate request. */
export async function sendEstimateEmail(id: string, p: ContactPayload, attempt: number): Promise<SendResult> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return { ok: false, code: "not_configured", error: "Email not configured" };
  try {
    await sendLovableEmail(
      {
        to: TO_ADDRESS,
        from: FROM_ADDRESS,
        sender_domain: SENDER_DOMAIN,
        reply_to: p.email,
        subject: `New estimate request from ${p.name}`,
        html: buildHtml(p),
        text: buildText(p),
        purpose: "transactional",
        label: "contact-estimate-request",
        idempotency_key: `estimate-${id}-${attempt}`,
      },
      { apiKey, sendUrl: Deno.env.get("LOVABLE_SEND_URL") },
    );
    return { ok: true };
  } catch (error) {
    if (error instanceof EmailAPIError) {
      console.error("Email API error", error.status, error.code);
      return { ok: false, code: String(error.code ?? "api_error"), error: error.message };
    }
    console.error("Email send error", error);
    return { ok: false, code: "unknown", error: String(error) };
  }
}
