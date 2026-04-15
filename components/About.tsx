import { Container } from "@/components/Container";

export function About() {
  return (
    <section className="section-shell section-padding" aria-labelledby="sobre-heading">
      <Container className="max-w-4xl">
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-12">
          <div className="max-w-2xl">
            <p className="eyebrow">Sobre Karina</p>
            <h2
              id="sobre-heading"
              className="mt-4 text-balance font-display text-[2rem] leading-[1.08] text-text sm:text-[2.55rem]"
            >
              Cuidado profesional con una atención cercana y personalizada
            </h2>
            <p className="mt-6 text-sm leading-8 text-muted sm:text-[1.02rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              porttitor, risus non interdum posuere, metus neque interdum lorem,
              sed pretium dolor metus et nibh. Cada tratamiento se adapta a las
              necesidades reales de tu piel y tus objetivos.
            </p>
            <p className="mt-5 text-sm leading-8 text-muted sm:text-[1.02rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              mattis, augue at convallis dictum, dolor mi fermentum sapien, a
              luctus lectus turpis ac ligula. La experiencia busca transmitir
              calma, confianza y resultados visibles.
            </p>
            <div className="mt-8 inline-flex items-center gap-3">
              <span className="h-px w-12 bg-line" aria-hidden="true" />
              <span className="font-display text-[2.1rem] italic text-text">Karina</span>
            </div>
          </div>
          <div className="card-surface hidden min-h-[19rem] rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.98),_rgba(241,235,227,0.88)_40%,_rgba(231,222,213,0.96)_100%)] lg:block" />
        </div>
      </Container>
    </section>
  );
}
