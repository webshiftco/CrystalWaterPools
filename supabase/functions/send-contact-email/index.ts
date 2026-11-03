// Public contact form: stores every estimate request, then emails the owner.
// If email fails, the request stays saved for review/resend on the admin page.
import { createClient } from "npm:@supabase/supabase-js@2";
import { type ContactPayload, sendEstimateEmail } from "../_shared/estimate/email.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const LIMITS: Record<keyof ContactPayload, number> = {
  name: 200, email: 255, phone: 50, address: 300, zip: 20, message: 5000,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = (await req.json()) as Partial<Record<keyof ContactPayload, unknown>>;
    const p = {} as ContactPayload;
    for (const k of Object.keys(LIMITS) as (keyof ContactPayload)[]) {
      const v = typeof body[k] === "string" ? (body[k] as string).trim() : "";
      if (!v) return json({ error: `Missing field: ${k}` }, 400);
      if (v.length > LIMITS[k]) return json({ error: `Field too long: ${k}` }, 400);
      p[k] = v;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return json({ error: "Invalid email" }, 400);

    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: row, error: insErr } = await db
      .from("estimate_requests")
      .insert({ ...p })
      .select("id")
      .single();

    if (insErr || !row) {
      // Storage failed: still try to email so the lead isn't lost.
      console.error("Insert failed", insErr?.message);
      const r = await sendEstimateEmail(crypto.randomUUID(), p, 1);
      return r.ok ? json({ success: true }) : json({ error: "Failed to save request" }, 500);
    }

    const r = await sendEstimateEmail(row.id, p, 1);
    const { error: upErr } = await db
      .from("estimate_requests")
      .update({
        email_status: r.ok ? "sent" : "failed",
        email_error: r.ok ? null : `${r.code}: ${r.error}`.slice(0, 1000),
        send_attempts: 1,
        last_attempt_at: new Date().toISOString(),
      })
      .eq("id", row.id);
    if (upErr) console.error("Status update failed", upErr.message);

    // The request is saved either way, so the visitor sees success.
    return json({ success: true, emailed: r.ok });
  } catch (err) {
    console.error("send-contact-email error", err);
    return json({ error: "Internal error" }, 500);
  }
});
