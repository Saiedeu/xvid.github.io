import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function HowItWorksStep({
  number,
  icon: Icon,
  title,
  description,
  isLast = false,
}: HowItWorksStepProps) {
  return (
    <div className="relative" data-testid={`step-${number}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl border-4 border-background shadow-lg">
            {number}
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            {description}
          </p>
        </div>
      </div>

      {!isLast && (
        <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border -z-10">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
        </div>
      )}
    </div>
  );
}
