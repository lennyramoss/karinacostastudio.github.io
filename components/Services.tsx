import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section className="section-shell section-padding pt-8 sm:pt-10" aria-labelledby="servicios-heading">
      <Container>
        <SectionHeading
          id="servicios-heading"
          eyebrow="Servicios"
          title="Tratamientos pensados para cada detalle"
          subtitle="Una selección de servicios faciales y corporales presentada con la misma calma visual y jerarquía de la referencia original."
        />
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="card-surface overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3.15] bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(244,239,233,0.9))]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-text">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted sm:text-[0.98rem]">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
