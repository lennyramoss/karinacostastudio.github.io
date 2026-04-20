import { Container } from "@/components/Container";
import { BookingTrigger } from "@/components/booking/BookingTrigger";

export function FinalCTA() {
  return (
    <section className="section-shell section-padding" aria-labelledby="cta-heading">
      <Container className="max-w-4xl">
        <div className="card-surface overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="eyebrow">Reservas</p>
          <h2
            id="cta-heading"
            className="mt-4 text-balance font-display text-[2rem] leading-[1.06] text-text sm:text-[2.6rem]"
          >
            Agendá tu turno hoy
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:text-[1.02rem]">
            Descubrí tu mejor versión con una experiencia serena, personalizada
            y pensada para acompañarte en cada detalle.
          </p>
          <div className="mx-auto mt-9 max-w-lg rounded-[1.9rem] border border-line bg-white/70 p-5 shadow-soft">
            <div className="grid gap-3 text-left sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-[1rem] font-semibold text-text">Consulta inicial</p>
                <p className="mt-1 text-sm leading-7 text-muted">
                  Elegí tu tratamiento y coordinamos el mejor horario para vos.
                </p>
              </div>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs uppercase tracking-soft text-text">
                Disponible
              </span>
            </div>
          </div>
          <BookingTrigger
            label="Reservar turno"
            className="focus-ring mt-9 inline-flex min-w-56 items-center justify-center rounded-full bg-accent px-10 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.52em] text-white shadow-[0_22px_44px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-white hover:text-accent hover:shadow-[0_24px_48px_rgba(15,23,42,0.24)] sm:min-w-64 sm:px-12 sm:py-5 sm:text-[0.84rem] sm:tracking-[0.58em]"
            ariaLabel="Reservar turno en Karina Studio +"
          />
        </div>
      </Container>
    </section>
  );
}
