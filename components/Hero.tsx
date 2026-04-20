import Image from "next/image";
import { BookingTrigger } from "@/components/booking/BookingTrigger";

export function Hero() {
  return (
    <header className="pb-8 pt-0 sm:pb-10 lg:pb-12">
      <div className="relative overflow-hidden bg-[#cfc8c0] shadow-[0_28px_90px_rgba(17,24,39,0.18)]">
        <div className="relative min-h-[82svh] sm:min-h-[88svh] lg:min-h-[90svh]">
          <Image
            src="/fotos/hero-studio.webp"
            alt="Interior de Karina Studio + en San Fernando, con sala de espera y área de atención estética"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-[62%_center] lg:object-center"
          />

          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,24,30,0.12)_0%,rgba(20,24,30,0.24)_48%,rgba(20,24,30,0.36)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),rgba(255,255,255,0)_34%),linear-gradient(90deg,rgba(17,24,39,0.08)_0%,rgba(17,24,39,0.02)_50%,rgba(17,24,39,0.16)_100%)]"
            aria-hidden="true"
          />

          <div className="relative flex min-h-[82svh] items-center justify-center px-5 py-14 text-center sm:min-h-[88svh] sm:px-8 sm:py-16 lg:min-h-[90svh] lg:px-10">
            <div className="max-w-[72rem]">
              <h1 className="text-balance text-[3rem] font-black uppercase leading-[0.95] tracking-[0.24em] text-white [font-family:'Phantom_Black','Phantom Black','Archia',var(--font-archia),'Avenir_Next','Avenir Next',sans-serif] [text-shadow:0_12px_34px_rgba(15,23,42,0.48)] sm:text-[5.2rem] sm:tracking-[0.34em] lg:text-[7.4rem]">
                karina acosta studio+
              </h1>
              <p className="mt-7 text-[0.72rem] font-semibold uppercase tracking-[0.52em] text-white [text-shadow:0_8px_26px_rgba(15,23,42,0.38)] sm:text-[0.82rem] sm:tracking-[0.68em]">
                potenciamos tu belleza
              </p>
              <div className="mt-10 flex justify-center">
                <BookingTrigger
                  label="Agenda tu cita"
                  className="focus-ring inline-flex min-w-56 items-center justify-center rounded-full bg-accent px-10 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.52em] text-white shadow-[0_22px_44px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-white hover:text-accent hover:shadow-[0_24px_48px_rgba(15,23,42,0.24)] sm:min-w-64 sm:px-12 sm:py-5 sm:text-[0.84rem] sm:tracking-[0.58em]"
                  ariaLabel="Agenda tu cita en Karina Acosta Studio+"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
