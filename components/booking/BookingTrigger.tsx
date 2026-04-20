"use client";

import { useBooking } from "@/components/booking/BookingProvider";
import type { ReactNode } from "react";

type BookingTriggerProps = {
  label: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function BookingTrigger({
  label,
  className = "",
  ariaLabel,
}: BookingTriggerProps) {
  const { openBooking } = useBooking();
  const buttonAriaLabel = ariaLabel ?? (typeof label === "string" ? label : undefined);

  return (
    <button
      type="button"
      onClick={openBooking}
      className={className}
      aria-label={buttonAriaLabel}
    >
      {label}
    </button>
  );
}
