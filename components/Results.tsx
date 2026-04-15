import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { results } from "@/lib/content";

export function Results() {
  return (
    <section className="section-shell section-padding" aria-labelledby="resultados-heading">
      <Container className="max-w-4xl">
        <SectionHeading
          id="resultados-heading"
          eyebrow="Resultados"
          title="Resultados reales"
          subtitle="Una grilla limpia y preparada para sumar fotos de antes y después sin modificar la estructura del sitio."
        />
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {results.map((item) => (
            <div
              key={item.src}
              className="card-surface relative aspect-square overflow-hidden rounded-[1.9rem]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 hover:scale-[1.015]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
