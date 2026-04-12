import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { BookOpen, Users, Heart, Lightbulb, MapPin } from "lucide-react";

interface StartHereModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PERSONAS = [
  {
    id: "pastor",
    title: "I'm a Pastor",
    description: "Navigating ministry, leadership, and calling",
    icon: BookOpen,
    color: "from-slate-600 to-slate-800",
    readingPath: "pastors-guide",
  },
  {
    id: "leader",
    title: "I'm a Church Leader",
    description: "Governance, vision, and organizational health",
    icon: Users,
    color: "from-emerald-600 to-emerald-800",
    readingPath: "church-leadership",
  },
  {
    id: "couple",
    title: "I'm in Ministry with My Spouse",
    description: "Marriage, family, and shared calling",
    icon: Heart,
    color: "from-rose-600 to-rose-800",
    readingPath: "marriage-family",
  },
  {
    id: "student",
    title: "I'm New to Faith/Ministry",
    description: "Foundational teaching and spiritual formation",
    icon: Lightbulb,
    color: "from-amber-600 to-amber-800",
    readingPath: "new-to-ministry",
  },
  {
    id: "visitor",
    title: "I'm Just Exploring",
    description: "Browse our best articles and resources",
    icon: MapPin,
    color: "from-indigo-600 to-indigo-800",
    readingPath: "editors-picks",
  },
];

export function StartHereModal({ isOpen, onClose }: StartHereModalProps) {
  const [, navigate] = useLocation();

  const handleSelectPersona = (readingPath: string) => {
    onClose();
    navigate(`/reading-paths/${readingPath}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif">Start Here</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Choose your path to find the most relevant articles and resources for your journey
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
          {PERSONAS.map((persona) => {
            const Icon = persona.icon;
            return (
              <button
                key={persona.id}
                onClick={() => handleSelectPersona(persona.readingPath)}
                className="group relative overflow-hidden rounded-lg p-6 text-left transition-all hover:shadow-lg"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${persona.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="w-8 h-8 text-gold" />
                    <div className="text-2xl opacity-10 group-hover:opacity-20 transition-opacity">→</div>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-gold transition-colors">
                    {persona.title}
                  </h3>

                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {persona.description}
                  </p>
                </div>

                {/* Border */}
                <div className="absolute inset-0 rounded-lg border border-border group-hover:border-gold transition-colors" />
              </button>
            );
          })}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Browse All Articles
          </Button>
          <Button
            onClick={() => handleSelectPersona("editors-picks")}
            className="flex-1 bg-gold hover:bg-gold/90 text-black"
          >
            See Editor's Picks
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
