import { Container } from "@/components/Container";

export function Location() {
  return (
    <section className="section-shell section-padding" aria-labelledby="ubicacion-heading">
      <Container>
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-10">
          <div className="max-w-md">
            <p className="eyebrow">Ubicación</p>
            <h2
              id="ubicacion-heading"
              className="mt-4 text-balance font-display text-[2rem] leading-[1.08] text-text sm:text-[2.5rem]"
            >
              San Fernando, Buenos Aires
            </h2>
            <p className="mt-5 text-sm leading-8 text-muted sm:text-[1.02rem]">
              Un espacio pensado para que tu rutina de estética facial y
              corporal se sienta cómoda, profesional y cercana desde el primer
              momento.
            </p>
          </div>
          <div className="card-surface overflow-hidden rounded-[1.9rem]">
            <iframe
              title="Mapa de ubicación de Karina Studio + en San Fernando, Buenos Aires"
              src="https://www.google.com/maps?q=Karina+Acosta+Studio%2B+Sarmiento+1058+San+Fernando&output=embed"
              className="h-[340px] w-full border-0 sm:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}


