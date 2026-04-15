import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="section-shell section-padding" aria-labelledby="testimonios-heading">
      <Container>
        <SectionHeading
          id="testimonios-heading"
          eyebrow="Testimonios"
          title="Lo que dicen nuestras clientas"
          subtitle="Testimonios reales"
        />
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="card-surface min-h-[15rem] p-6 sm:p-7">
              <blockquote className="text-[1rem] leading-8 text-text">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <p className="text-sm font-semibold text-text">{testimonial.name}</p>
                <p className="mt-1 text-xs uppercase tracking-soft text-muted">
                  Cliente
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
