import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}
export default function PageTitle({
  title,
  subtitle,
  className,
}: PageTitleProps) {
  return (
    <>
      <div className={cn("mb-8", className)}>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </>
  );
}
