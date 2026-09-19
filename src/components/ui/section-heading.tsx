import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

const SectionHeading = ({ title, subtitle, className, light }: SectionHeadingProps) => {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h2 className={cn("text-3xl md:text-4xl font-bold mb-3", light ? "text-primary-foreground" : "text-foreground")}>
        {title}
      </h2>
      <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-4" />
      {subtitle && (
        <p className={cn("text-lg max-w-2xl mx-auto", light ? "text-primary-foreground/90" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
