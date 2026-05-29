import { Sparkles } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <span className="eyebrow">
        <Sparkles aria-hidden="true" size={14} />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-[rgb(var(--muted))] sm:text-lg">{description}</p>
    </div>
  );
}
