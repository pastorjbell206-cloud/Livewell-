import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, AlertCircle, Clock } from "lucide-react";

export function AdminSyncPanel() {
  const [syncing, setSyncing] = useState<"all" | "substack" | "pastors" | null>(null);
  const [lastSync, setLastSync] = useState<{ time: string; added: number; skipped: number } | null>(null);

  const { data: syncStatus } = trpc.feedSync.getStatus.useQuery();
  const syncAllMutation = trpc.feedSync.syncAll.useMutation({
    onSuccess: (data) => {
      setLastSync({
        time: new Date().toLocaleTimeString(),
        added: data.details.totalAdded,
        skipped: data.details.totalSkipped,
      });
      setSyncing(null);
    },
    onError: () => setSyncing(null),
  });

  const syncSourceMutation = trpc.feedSync.syncSource.useMutation({
    onSuccess: (data) => {
      setLastSync({
        time: new Date().toLocaleTimeString(),
        added: data.details.itemsAdded,
        skipped: data.details.itemsSkipped,
      });
      setSyncing(null);
    },
    onError: () => setSyncing(null),
  });

  const handleSyncAll = async () => {
    setSyncing("all");
    await syncAllMutation.mutateAsync();
  };

  const handleSyncSource = async (source: "substack" | "pastors") => {
    setSyncing(source);
    const sourceId = source === "substack" ? "substack" : "pastors-connection";
    await syncSourceMutation.mutateAsync({ source: sourceId });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
          Content Feed Sync
        </h2>
        <p style={{ color: "#6B7280" }}>
          Manage automatic syncing of articles from Substack and Pastors Connection
        </p>
      </div>

      {/* Sync Status */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: "#F7F5F0",
          borderColor: "#D1C9BB",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold" style={{ color: "#1A1A1A" }}>
            Sync Schedule
          </h3>
          <div className="flex items-center gap-2" style={{ color: "#6B7280" }}>
            <Clock size={16} />
            <span>Daily at 6:00 AM</span>
          </div>
        </div>

        {lastSync && (
          <div className="flex items-center gap-2 p-3 rounded" style={{ backgroundColor: "#ECFDF5" }}>
            <CheckCircle size={20} style={{ color: "#10B981" }} />
            <div>
              <p style={{ color: "#059669", fontWeight: 500 }}>
                Last sync: {lastSync.time}
              </p>
              <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>
                {lastSync.added} articles added, {lastSync.skipped} skipped
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Feed Sources */}
      <div className="space-y-4">
        <h3 className="font-semibold" style={{ color: "#1A1A1A" }}>
          Feed Sources
        </h3>

        {/* Substack */}
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: "#F7F5F0",
            borderColor: "#D1C9BB",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold" style={{ color: "#1A1A1A" }}>
                Substack
              </h4>
              <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>
                https://jamesbell.substack.com/feed
              </p>
            </div>
            <div
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: "#DBEAFE", color: "#1E40AF" }}
            >
              Active
            </div>
          </div>

          <Button
            onClick={() => handleSyncSource("substack")}
            disabled={syncing !== null}
            className="flex items-center gap-2 w-full"
            style={{
              backgroundColor: syncing === "substack" ? "#B8963E" : "#1A1A1A",
              color: "#F7F5F0",
            }}
          >
            {syncing === "substack" ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                Sync Now
              </>
            )}
          </Button>
        </div>

        {/* Pastors Connection */}
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: "#F7F5F0",
            borderColor: "#D1C9BB",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold" style={{ color: "#1A1A1A" }}>
                Pastors Connection
              </h4>
              <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>
                https://www.pastorsconnection.com/feed
              </p>
            </div>
            <div
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: "#DBEAFE", color: "#1E40AF" }}
            >
              Active
            </div>
          </div>

          <Button
            onClick={() => handleSyncSource("pastors")}
            disabled={syncing !== null}
            className="flex items-center gap-2 w-full"
            style={{
              backgroundColor: syncing === "pastors" ? "#B8963E" : "#1A1A1A",
              color: "#F7F5F0",
            }}
          >
            {syncing === "pastors" ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                Sync Now
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Sync All Button */}
      <Button
        onClick={handleSyncAll}
        disabled={syncing !== null}
        className="w-full flex items-center justify-center gap-2 py-3"
        style={{
          backgroundColor: syncing === "all" ? "#B8963E" : "#2D4A3E",
          color: "#F7F5F0",
          fontSize: "1rem",
        }}
      >
        {syncing === "all" ? (
          <>
            <RefreshCw size={18} className="animate-spin" />
            Syncing All Feeds...
          </>
        ) : (
          <>
            <RefreshCw size={18} />
            Sync All Feeds Now
          </>
        )}
      </Button>

      {/* Info */}
      <div
        className="p-4 rounded-lg flex gap-3"
        style={{
          backgroundColor: "#FEF3C7",
          borderLeft: "4px solid #F59E0B",
        }}
      >
        <AlertCircle size={20} style={{ color: "#D97706", flexShrink: 0 }} />
        <div style={{ color: "#92400E" }}>
          <p className="font-semibold mb-1">Automatic Syncing Enabled</p>
          <p style={{ fontSize: "0.875rem" }}>
            Feeds are automatically synced daily at 6:00 AM. You can also manually trigger syncs anytime using the buttons above.
          </p>
        </div>
      </div>
    </div>
  );
}
