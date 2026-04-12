import { useParams } from "wouter";
import { LeadMagnetLanding } from "./LeadMagnetLanding";

export function LeadMagnetsPage() {
  const { magnetId } = useParams<{ magnetId: string }>();

  if (!magnetId) {
    return <div className="text-center py-20">Lead magnet not found</div>;
  }

  return <LeadMagnetLanding magnetId={magnetId} />;
}
