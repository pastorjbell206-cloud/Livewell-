import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { Loader2, Save, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

// The services the platform depends on, with what to do when one is off.
const INTEGRATIONS: { key: string; label: string; whenOff: string }[] = [
  { key: "DATABASE_URL", label: "Database", whenOff: "Nothing dynamic works — add DATABASE_URL in Vercel." },
  { key: "STRIPE_SECRET_KEY", label: "Stripe (checkout)", whenOff: "No ebook or membership can charge — add STRIPE_SECRET_KEY in Vercel." },
  { key: "JWT_SECRET", label: "Admin sessions", whenOff: "Admin login cannot issue sessions — add JWT_SECRET in Vercel." },
  { key: "ADMIN_PASSWORD_HASH", label: "Admin password", whenOff: "No one can log in — add ADMIN_PASSWORD_HASH in Vercel." },
  { key: "MAILCHIMP", label: "Mailchimp (email)", whenOff: "Optional. Signups store locally + hand off to Substack either way." },
  { key: "SEED_KEY", label: "Seed key (API admin)", whenOff: "Optional. Header-authenticated admin endpoints stay closed without it." },
];

export default function AdminSettings() {
  const [form, setForm] = useState({
    substackUrl: "",
    pastorsConnectionUrl: "",
    stripeMembershipPriceId: "",
    stripeMembershipPriceIdAnnual: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [configured, setConfigured] = useState<Record<string, boolean> | null>(null);

  const getAllSettingsQuery = trpc.settings.getAll.useQuery();
  const setSettingsMutation = trpc.settings.setMultiple.useMutation();

  useEffect(() => {
    let active = true;
    fetch("/api/admin/status", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && d?.configured && setConfigured(d.configured))
      .catch(() => { /* panel shows its unavailable note */ });
    return () => { active = false; };
  }, []);

  // Hydrate the form from the loaded settings (guarded state adjustment
  // during render — see react.dev "You Might Not Need an Effect").
  const [hydratedFrom, setHydratedFrom] = useState<typeof getAllSettingsQuery.data | null>(null);
  if (getAllSettingsQuery.data && getAllSettingsQuery.data !== hydratedFrom) {
    setHydratedFrom(getAllSettingsQuery.data);
    setForm({
      substackUrl: getAllSettingsQuery.data.substackUrl || "",
      pastorsConnectionUrl: getAllSettingsQuery.data.pastorsConnectionUrl || "",
      stripeMembershipPriceId: getAllSettingsQuery.data.stripeMembershipPriceId || "",
      stripeMembershipPriceIdAnnual: getAllSettingsQuery.data.stripeMembershipPriceIdAnnual || "",
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await setSettingsMutation.mutateAsync({
        settings: {
          substackUrl: form.substackUrl,
          pastorsConnectionUrl: form.pastorsConnectionUrl,
          stripeMembershipPriceId: form.stripeMembershipPriceId,
          stripeMembershipPriceIdAnnual: form.stripeMembershipPriceIdAnnual,
        },
      });
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "var(--ink)" }}>
          Site Settings
        </h1>
        <p className="font-body mb-8" style={{ color: "var(--ink-muted)" }}>
          Configure your external links and connections
        </p>

        {/* Integrations at a glance — which services are actually connected. */}
        <div className="max-w-2xl mb-10 rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--adm-gray-line)" }}>
          <div className="px-5 pt-4 pb-2">
            <h2 className="font-display text-xl font-bold" style={{ color: "var(--charcoal)" }}>Integrations</h2>
            <p className="font-body text-sm" style={{ color: "var(--adm-gray)" }}>
              {configured ? "What is connected on the live server right now." : "Loading connection status… (needs the production API and an admin session)"}
            </p>
          </div>
          {configured && INTEGRATIONS.map((i, idx) => (
            <div key={i.key} className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5" style={{ borderTop: idx === 0 ? "1px solid var(--adm-gray-line)" : "1px solid var(--adm-gray-bg)" }}>
              <span className="font-ui text-sm" style={{ color: "var(--charcoal)" }}>{i.label}</span>
              {configured[i.key] ? (
                <span className="flex items-center gap-1 font-ui text-xs font-semibold" style={{ color: "var(--adm-ok)" }}>
                  <CheckCircle2 size={14} /> Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 font-ui text-xs" style={{ color: "var(--alert)" }} title={i.whenOff}>
                  <XCircle size={14} /> Not connected — {i.whenOff}
                </span>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
          {/* Substack */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: "var(--ink)" }}>
              Substack Newsletter
            </h2>
            <div>
              <label className="block font-ui text-sm font-medium mb-2" style={{ color: "var(--ink)" }}>
                Substack URL
              </label>
              <input
                type="text"
                value={form.substackUrl}
                onChange={(e) => setForm({ ...form, substackUrl: e.target.value })}
                className="w-full px-4 py-2 rounded border font-body"
                style={{ borderColor: "var(--line)", backgroundColor: "var(--card)" }}
                placeholder="https://substack.com/@yourname"
              />
              <p className="font-ui text-xs mt-2" style={{ color: "var(--ink-muted)" }}>
                This URL will be used on the Substack page and newsletter signup links
              </p>
            </div>
          </div>

          {/* Pastors Connection */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: "var(--ink)" }}>
              Pastors Connection Network
            </h2>
            <div>
              <label className="block font-ui text-sm font-medium mb-2" style={{ color: "var(--ink)" }}>
                Pastors Connection Website URL
              </label>
              <input
                type="text"
                value={form.pastorsConnectionUrl}
                onChange={(e) => setForm({ ...form, pastorsConnectionUrl: e.target.value })}
                className="w-full px-4 py-2 rounded border font-body"
                style={{ borderColor: "var(--line)", backgroundColor: "var(--card)" }}
                placeholder="https://pastorsconnection.example.com"
              />
              <p className="font-ui text-xs mt-2" style={{ color: "var(--ink-muted)" }}>
                This URL will be used on the Pastors Connection page for joining/learning more
              </p>
            </div>
          </div>

          {/* Membership (Stripe) */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: "var(--charcoal)" }}>
              Membership (Stripe)
            </h2>
            <div>
              <label className="block font-ui text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>
                Stripe Price ID for the membership plan
              </label>
              <input
                type="text"
                value={form.stripeMembershipPriceId}
                onChange={(e) => setForm({ ...form, stripeMembershipPriceId: e.target.value })}
                className="w-full px-4 py-2 rounded border font-body"
                style={{ borderColor: "var(--adm-line)", backgroundColor: "var(--card)" }}
                placeholder="price_..."
              />
              <p className="font-ui text-xs mt-2" style={{ color: "var(--adm-gray)" }}>
                Two steps to open membership checkout: 1) add STRIPE_SECRET_KEY as an environment variable in Vercel, 2) create a recurring product in your Stripe dashboard and paste its Price ID (starts with price_) here. While either is missing, the membership page shows the waitlist instead. Clear this field to close checkout again.
              </p>
            </div>
            <div className="mt-4">
              <label className="block font-ui text-sm font-medium mb-2" style={{ color: "var(--charcoal)" }}>
                Stripe Price ID for the annual plan (optional)
              </label>
              <input
                type="text"
                value={form.stripeMembershipPriceIdAnnual}
                onChange={(e) => setForm({ ...form, stripeMembershipPriceIdAnnual: e.target.value })}
                className="w-full px-4 py-2 rounded border font-body"
                style={{ borderColor: "var(--adm-line)", backgroundColor: "var(--card)" }}
                placeholder="price_..."
              />
              <p className="font-ui text-xs mt-2" style={{ color: "var(--adm-gray)" }}>
                Optional. Paste a second recurring Price ID (e.g. a yearly plan) to offer a monthly/annual choice on the membership page. Leave blank to sell the monthly plan only — the page then behaves exactly as it does today.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading || getAllSettingsQuery.isLoading}
              className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "var(--charcoal)", color: "var(--bone)" }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
