import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all" data-testid={`card-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="space-y-3">
        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
}
