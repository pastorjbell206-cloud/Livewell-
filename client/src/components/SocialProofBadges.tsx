import { Star, Users, TrendingUp, Award } from "lucide-react";

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const Badge = ({ icon, label, value }: BadgeProps) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white border" style={{ borderColor: "#D1C9BB" }}>
    <div style={{ color: "#B8963E" }}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "#6B7280" }}>
        {label}
      </p>
      <p className="text-lg font-bold" style={{ color: "#1A1A1A" }}>
        {value}
      </p>
    </div>
  </div>
);

export function SocialProofBadges() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-12">
      <Badge
        icon={<Star size={20} />}
        label="Rating"
        value="4.9/5"
      />
      <Badge
        icon={<Users size={20} />}
        label="Community"
        value="1.2K+"
      />
      <Badge
        icon={<TrendingUp size={20} />}
        label="Growth"
        value="45%/yr"
      />
      <Badge
        icon={<Award size={20} />}
        label="Featured"
        value="12 Sites"
      />
    </div>
  );
}
