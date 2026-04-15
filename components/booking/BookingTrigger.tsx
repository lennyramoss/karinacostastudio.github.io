"use client";

import { useBooking } from "@/components/booking/BookingProvider";

type BookingTriggerProps = {
  label: string;
  className?: string;
  ariaLabel?: string;
};

export function BookingTrigger({
  label,
  className = "",
  ariaLabel,
}: BookingTriggerProps) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={openBooking}
      className={className}
      aria-label={ariaLabel ?? label}
    >
      {label}
    </button>
  );
}
