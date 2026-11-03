// Admin-only: re-sends the owner email for a stored estimate request.
import { createClient } from "npm:@supabase/supabase-js@2";
import { sendEstimateEmail } from "../_shared/estimate/email.ts";

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Unauthorized" }, 401);

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: userData, error: authErr } = await db.auth.getUser(token);
  if (authErr || !userData.user) return json({ error: "Unauthorized" }, 401);

  const { data: isAdmin } = await db.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
  if (!isAdmin) return json({ error: "Forbidden" }, 403);

  let id = "";
  try {
    id = String((await req.json())?.id ?? "");
  } catch { /* ignore */ }
  if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: "Invalid id" }, 400);

  const { data: row, error } = await db.from("estimate_requests").select("*").eq("id", id).single();
  if (error || !row) return json({ error: "Not found" }, 404);

  const attempt = (row.send_attempts ?? 0) + 1;
  const r = await sendEstimateEmail(row.id, row, attempt);
  await db
    .from("estimate_requests")
    .update({
      email_status: r.ok ? "sent" : "failed",
      email_error: r.ok ? null : `${r.code}: ${r.error}`.slice(0, 1000),
      send_attempts: attempt,
      last_attempt_at: new Date().toISOString(),
    })
    .eq("id", id);

  return json(r.ok ? { success: true } : { success: false, error: r.error });
});
