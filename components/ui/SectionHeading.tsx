type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center"
}: SectionHeadingProps) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`mx-auto flex max-w-3xl flex-col ${alignment}`}>
      <p className="font-mono text-xs font-semibold uppercase text-cyan-glow">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-pretty text-base leading-7 text-muted sm:text-lg">
        {description}
      </p>
    </div>
  );
}
