import { CheckCircle, Users, Award, TrendingUp } from "lucide-react";

interface TrustSignal {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function TrustSignals() {
  const signals: TrustSignal[] = [
    {
      icon: <CheckCircle size={24} />,
      title: "Trusted by Pastors",
      description: "Read by ministry leaders across 12+ countries",
    },
    {
      icon: <Users size={24} />,
      title: "Growing Community",
      description: "1,200+ Substack subscribers and counting",
    },
    {
      icon: <Award size={24} />,
      title: "Editorial Excellence",
      description: "225+ carefully curated articles on faith and culture",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Consistent Growth",
      description: "45% year-over-year growth in readership",
    },
  ];

  return (
    <section className="py-12 bg-white rounded-lg border" style={{ borderColor: "#D1C9BB" }}>
      <div className="px-6">
        <h3 className="font-display font-bold text-2xl mb-8 text-center" style={{ color: "#1A1A1A" }}>
          Why Readers Trust LiveWell
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {signals.map((signal, index) => (
            <div key={index} className="flex gap-4">
              <div style={{ color: "#B8963E" }}>
                {signal.icon}
              </div>
              <div>
                <h4 className="font-bold mb-1" style={{ color: "#1A1A1A" }}>
                  {signal.title}
                </h4>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  {signal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
