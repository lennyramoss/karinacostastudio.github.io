type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`mb-10 flex flex-col gap-3 sm:mb-12 ${alignment}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <div className="max-w-[40rem]">
        <h2
          id={id}
          className="text-balance font-display text-[2rem] leading-[1.05] text-text sm:text-[2.5rem] lg:text-[2.9rem]"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-4 max-w-[36rem] text-sm leading-7 text-muted sm:text-[1.02rem]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
