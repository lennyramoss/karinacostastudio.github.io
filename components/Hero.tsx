import Image from "next/image";
import { BookingTrigger } from "@/components/booking/BookingTrigger";

export function Hero() {
  return (
    <header className="pb-8 pt-0 sm:pb-10 lg:pb-12">
      <div className="relative overflow-hidden bg-[#cfc8c0] shadow-[0_28px_90px_rgba(17,24,39,0.18)]">
        <div className="relative min-h-[82svh] sm:min-h-[88svh] lg:min-h-[90svh]">
          <Image
            src="/hero-studio.png"
            alt="Interior de Karina Studio + en San Fernando, con sala de espera y área de atención estética"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-[62%_center] lg:object-center"
          />

          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.16)_0%,rgba(17,24,39,0.26)_42%,rgba(17,24,39,0.34)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),rgba(255,255,255,0)_34%),linear-gradient(90deg,rgba(17,24,39,0.08)_0%,rgba(17,24,39,0.02)_50%,rgba(17,24,39,0.14)_100%)]"
            aria-hidden="true"
          />

          <div className="relative flex min-h-[82svh] items-center justify-center px-5 py-10 text-center sm:min-h-[88svh] sm:px-8 sm:py-14 lg:min-h-[90svh] lg:px-10">
            <div className="max-w-[44rem] rounded-[2rem] bg-[linear-gradient(180deg,rgba(17,24,39,0.36),rgba(17,24,39,0.18))] px-5 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-[4px] sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/88 backdrop-blur-[2px]">
                Viví la experiencia
              </span>
              <h1 className="mt-6 text-balance font-display text-[3.25rem] leading-[0.9] tracking-[-0.05em] text-white [text-shadow:0_10px_30px_rgba(15,23,42,0.45)] sm:text-[5rem] lg:text-[6.5rem]">
                Karina Studio +
              </h1>
              <p className="mx-auto mt-5 max-w-[36rem] text-balance text-[1rem] leading-7 text-white/92 [text-shadow:0_8px_24px_rgba(15,23,42,0.35)] sm:text-[1.12rem] sm:leading-8">
                Potenciamos tu belleza con tratamientos faciales, cejas y
                labios en San Fernando
              </p>
              <div className="mt-9 flex flex-col items-center gap-4">
                <BookingTrigger
                  label="Agendar turno"
                  className="premium-button min-w-44 border border-white/15 bg-white px-7 py-3.5 text-accent shadow-[0_22px_44px_rgba(15,23,42,0.18)]"
                  ariaLabel="Agendar turno en Karina Studio +"
                />
                <p className="text-xs uppercase tracking-[0.18em] text-white/80 [text-shadow:0_6px_18px_rgba(15,23,42,0.28)]">
                  Atención personalizada y reservas por mensaje
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
