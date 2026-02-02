import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", className)}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {title && (
          <h2 className="mb-8 font-mono text-sm font-semibold uppercase tracking-widest text-accent-brand md:mb-12">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
