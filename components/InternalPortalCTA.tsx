import Link from "next/link";
import { Container } from "@/components/Container";

export function InternalPortalCTA() {
  return (
    <section className="section-shell pb-12 pt-4 sm:pb-16">
      <Container>
        <div className="card-surface overflow-hidden p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="eyebrow">Apartado interno</p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] text-text sm:text-[2.4rem]">
                Agenda demo para trabajadoras y secretaria
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-[1.02rem]">
                Sumamos una pagina separada de la landing para revisar turnos
                semanales por trabajadora o ver el tablero completo desde
                secretaria.
              </p>
            </div>

            <Link
              href="/agenda-equipo"
              className="premium-button min-w-56 whitespace-nowrap"
            >
              Ver portal interno
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
