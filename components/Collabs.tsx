import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { collabs } from "@/lib/content";

export function Collabs() {
  return (
    <section className="section-shell section-padding" aria-labelledby="colabs-heading">
      <Container>
        <SectionHeading
          id="colabs-heading"
          eyebrow="Collabs"
          title="Nos eligen para colaborar con marcas y referentes del mundo de la belleza"
          subtitle="Karina Studio + acompaña eventos, marcas y referentes con servicios de belleza cuidados al detalle."
        />

        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {collabs.map((collab) => (
            <article key={collab.label} className="card-surface overflow-hidden">
              <div className="relative aspect-[4/5] bg-accent-soft">
                <Image
                  src={collab.image}
                  alt={collab.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted">
                  {collab.label}
                </p>
                <h3 className="mt-3 text-[1.18rem] font-semibold tracking-[-0.02em] text-text">
                  {collab.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {collab.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-line bg-white/55 px-5 py-5 text-center shadow-soft sm:px-8 sm:py-6">
          <p className="font-display text-2xl leading-tight text-text sm:text-3xl">
            Y muchas colaboraciones más
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-[1rem]">
            Una trayectoria construida con confianza, profesionalismo y
            experiencias reales dentro del mundo de la belleza.
          </p>
        </div>
      </Container>
    </section>
  );
}
