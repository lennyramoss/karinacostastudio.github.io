import Image from "next/image";
import { BookingTrigger } from "@/components/booking/BookingTrigger";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

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
                <div className="flex items-center gap-3">
                  <BookingTrigger
                    label="Agenda tu cita"
                    className="focus-ring inline-flex min-w-56 items-center justify-center rounded-full bg-accent px-10 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.52em] text-white shadow-[0_22px_44px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-white hover:text-accent hover:shadow-[0_24px_48px_rgba(15,23,42,0.24)] sm:min-w-64 sm:px-12 sm:py-5 sm:text-[0.84rem] sm:tracking-[0.58em]"
                    ariaLabel="Agenda tu cita en Karina Acosta Studio+"
                  />
                  <a
                    href="https://www.instagram.com/karinaacostastudio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_22px_44px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-white hover:text-accent hover:shadow-[0_24px_48px_rgba(15,23,42,0.24)]"
                    aria-label="Seguinos en Instagram"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
