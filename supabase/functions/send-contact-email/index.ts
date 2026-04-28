// Sends a contact form notification email to the business owner.
// Public function: no JWT required (called from the website's contact form).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LOVABLE_API_URL = "https://api.lovable.dev/v1/messaging/email/send";
const SENDER_DOMAIN = "notify.crystalwaterpoolsinga.com";
const FROM_ADDRESS = `Crystal Water Pools <noreply@${SENDER_DOMAIN}>`;
const TO_ADDRESS = "crystalwaterpoolsinga@gmail.com";

interface ContactPayload {
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Partial<ContactPayload>;
    const required: (keyof ContactPayload)[] = ["name", "email", "phone", "address", "zip", "message"];
    for (const k of required) {
      if (!body[k] || typeof body[k] !== "string" || !String(body[k]).trim()) {
        return new Response(JSON.stringify({ error: `Missing field: ${k}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    const payload = body as ContactPayload;

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      console.error("LOVABLE_API_KEY missing");
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const idempotencyKey = `contact-${crypto.randomUUID()}`;
    const emailRequest = {
      to: TO_ADDRESS,
      from: FROM_ADDRESS,
      sender_domain: SENDER_DOMAIN,
      reply_to: payload.email,
      subject: `New estimate request from ${payload.name}`,
      html: buildHtml(payload),
      text: buildText(payload),
      purpose: "transactional",
      idempotency_key: idempotencyKey,
    };

    const res = await fetch(LOVABLE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailRequest),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Email API error", res.status, errText);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify({ success: true, message_id: data.message_id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-contact-email error", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
