import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [form, setForm] = useState({
    substackUrl: "",
    pastorsConnectionUrl: "",
    stripeMembershipPriceId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getAllSettingsQuery = trpc.settings.getAll.useQuery();
  const setSettingsMutation = trpc.settings.setMultiple.useMutation();

  useEffect(() => {
    if (getAllSettingsQuery.data) {
      setForm({
        substackUrl: getAllSettingsQuery.data.substackUrl || "",
        pastorsConnectionUrl: getAllSettingsQuery.data.pastorsConnectionUrl || "",
        stripeMembershipPriceId: getAllSettingsQuery.data.stripeMembershipPriceId || "",
      });
    }
  }, [getAllSettingsQuery.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await setSettingsMutation.mutateAsync({
        settings: {
          substackUrl: form.substackUrl,
          pastorsConnectionUrl: form.pastorsConnectionUrl,
          stripeMembershipPriceId: form.stripeMembershipPriceId,
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
        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
          Site Settings
        </h1>
        <p className="font-body mb-8" style={{ color: "#6B7280" }}>
          Configure your external links and connections
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
          {/* Substack */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
              Substack Newsletter
            </h2>
            <div>
              <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
                Substack URL
              </label>
              <input
                type="text"
                value={form.substackUrl}
                onChange={(e) => setForm({ ...form, substackUrl: e.target.value })}
                className="w-full px-4 py-2 rounded border font-body"
                style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
                placeholder="https://substack.com/@yourname"
              />
              <p className="font-ui text-xs mt-2" style={{ color: "#6B7280" }}>
                This URL will be used on the Substack page and newsletter signup links
              </p>
            </div>
          </div>

          {/* Pastors Connection */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
              Pastors Connection Network
            </h2>
            <div>
              <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
                Pastors Connection Website URL
              </label>
              <input
                type="text"
                value={form.pastorsConnectionUrl}
                onChange={(e) => setForm({ ...form, pastorsConnectionUrl: e.target.value })}
                className="w-full px-4 py-2 rounded border font-body"
                style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
                placeholder="https://pastorsconnection.example.com"
              />
              <p className="font-ui text-xs mt-2" style={{ color: "#6B7280" }}>
                This URL will be used on the Pastors Connection page for joining/learning more
              </p>
            </div>
          </div>

          {/* Membership (Stripe) */}
          <div>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
              Membership (Stripe)
            </h2>
            <div>
              <label className="block font-ui text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
                Stripe Price ID for the membership plan
              </label>
              <input
                type="text"
                value={form.stripeMembershipPriceId}
                onChange={(e) => setForm({ ...form, stripeMembershipPriceId: e.target.value })}
                className="w-full px-4 py-2 rounded border font-body"
                style={{ borderColor: "#D1C9BB", backgroundColor: "#FFFFFF" }}
                placeholder="price_..."
              />
              <p className="font-ui text-xs mt-2" style={{ color: "#6B7280" }}>
                Two steps to open membership checkout: 1) add STRIPE_SECRET_KEY as an environment variable in Vercel, 2) create a recurring product in your Stripe dashboard and paste its Price ID (starts with price_) here. While either is missing, the membership page shows the waitlist instead. Clear this field to close checkout again.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading || getAllSettingsQuery.isLoading}
              className="flex items-center gap-2 px-6 py-3 rounded font-ui font-medium transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#1A1A1A", color: "#F7F5F0" }}
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
