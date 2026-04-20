"use client";

import { BookingTrigger } from "@/components/booking/BookingTrigger";

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
    >
      <path
        d="M7 3.75v2.5M17 3.75v2.5M4.75 9.25h14.5M6.5 5.25h11A2.75 2.75 0 0 1 20.25 8v9.5a2.75 2.75 0 0 1-2.75 2.75h-11a2.75 2.75 0 0 1-2.75-2.75V8A2.75 2.75 0 0 1 6.5 5.25Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FloatingBookingButton() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:block">
      <BookingTrigger
        label={
          <span className="inline-flex items-center gap-2">
            <CalendarIcon />
            <span>Reservar</span>
          </span>
        }
        className="focus-ring inline-flex min-h-12 w-auto items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-normal text-white shadow-[0_18px_46px_rgba(15,23,42,0.24)] transition hover:-translate-y-0.5 hover:bg-white hover:text-accent hover:shadow-[0_22px_52px_rgba(15,23,42,0.25)] sm:min-w-0 sm:px-6"
        ariaLabel="Reservar una cita en Karina Studio +"
      />
    </div>
  );
}
