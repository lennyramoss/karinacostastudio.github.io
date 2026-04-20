import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer
      id="contacto"
      className="border-t border-line/90 bg-white/25 py-12 text-sm text-muted backdrop-blur-[2px] sm:py-14"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <p className="font-display text-[2rem] leading-none text-text">Karina Studio +</p>
            <p className="mt-4 max-w-xs leading-7">
              Estética facial y corporal con atención personalizada en San
              Fernando, Buenos Aires.
            </p>
          </div>
          <div>
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-text">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 leading-6">
              <li>+54 11 7861-1500</li>
              <li>Sarmiento 1058, San Fernando</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-text">
              Redes y horario
            </h3>
            <ul className="mt-4 space-y-3 leading-6">
              <li>@karinaacostastudio</li>
              <li>Lunes,Martes,Jueves y Viernes de 10 a 19 hs</li>
              <li>Sábados de 10 a 17 hs</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-text">
              Copyright
            </h3>
            <p className="mt-4 leading-7">
              © 2026 Karina Studio +. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
