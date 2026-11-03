import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Row = {
  id: string; name: string; email: string; phone: string; address: string; zip: string;
  message: string; email_status: string; email_error: string | null; send_attempts: number;
  created_at: string;
};

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Admin | Crystal Water Pools";
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  const load = async () => {
    const { data, error } = await supabase
      .from("estimate_requests").select("*").order("created_at", { ascending: false });
    if (error) toast.error("Could not load requests");
    setRows((data as Row[]) ?? []);
  };

  useEffect(() => {
    if (!session) { setIsAdmin(false); return; }
    supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" }).then(({ data }) => {
      setIsAdmin(!!data);
      if (data) load();
    });
  }, [session]);

  const auth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email")), password = String(fd.get("password"));
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email, password, options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) toast.error(error.message);
      else toast.success("Check your email to confirm your account, then sign in.");
    }
  };

  const resend = async (id: string) => {
    setBusy(id);
    const { data, error } = await supabase.functions.invoke("resend-estimate", { body: { id } });
    setBusy(null);
    if (error || !data?.success) toast.error("Resend failed", { description: data?.error });
    else toast.success("Email sent");
    load();
  };

  if (!ready) return null;

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-6">
        <form onSubmit={auth} className="w-full max-w-sm space-y-4 rounded-xl border bg-card p-6">
          <h1 className="text-2xl font-semibold text-foreground">Admin {mode === "in" ? "sign in" : "sign up"}</h1>
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" minLength={8} required />
          <Button type="submit" className="w-full">{mode === "in" ? "Sign in" : "Create account"}</Button>
          <button type="button" className="text-sm text-muted-foreground underline"
            onClick={() => setMode(mode === "in" ? "up" : "in")}>
            {mode === "in" ? "First time? Create account" : "Have an account? Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground">Estimate requests</h1>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
        </div>
        {!isAdmin ? (
          <p className="text-muted-foreground">This account doesn't have admin access.</p>
        ) : rows.length === 0 ? (
          <p className="text-muted-foreground">No requests yet.</p>
        ) : (
          <div className="space-y-4">
            {rows.map((r) => (
              <article key={r.id} className="rounded-xl border bg-card p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="font-semibold text-foreground">{r.name}</h2>
                    <p className="text-sm text-muted-foreground">{new Date(r.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={r.email_status === "sent" ? "default" : "destructive"}>
                      {r.email_status === "sent" ? "Emailed" : r.email_status === "failed" ? "Email failed" : "Pending"}
                    </Badge>
                    <Button size="sm" disabled={busy === r.id} onClick={() => resend(r.id)}>
                      {busy === r.id ? "Sending…" : "Resend email"}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-foreground">
                  <a className="underline" href={`mailto:${r.email}`}>{r.email}</a> · <a className="underline" href={`tel:${r.phone}`}>{r.phone}</a> · {r.address}, {r.zip}
                </p>
                <p className="whitespace-pre-wrap text-sm text-foreground">{r.message}</p>
                {r.email_error && <p className="text-xs text-destructive">Last error: {r.email_error}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
