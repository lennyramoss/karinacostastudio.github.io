"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import {
  bookingCategories,
  bookingTimes,
  findCategoryForService,
  getUpcomingBookingDays,
  serviceProfessionals,
  stepLabels,
} from "@/lib/booking";

type BookingContextValue = {
  openBooking: () => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

type BookingState = {
  service: string;
  category: string;
  professional: string;
  day: string;
  time: string;
  phone: string;
};

const initialState: BookingState = {
  service: "",
  category: "",
  professional: "",
  day: "",
  time: "",
  phone: "",
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <BookingContext.Provider
      value={{
        openBooking: () => setIsOpen(true),
        closeBooking: () => setIsOpen(false),
      }}
    >
      {children}
      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}

function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<BookingState>(initialState);
  const [phoneError, setPhoneError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dialogTitleId = useId();
  const upcomingDays = getUpcomingBookingDays();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setState(initialState);
      setPhoneError("");
      setIsConfirmed(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const canContinue =
    (step === 0 && Boolean(state.service)) ||
    (step === 1 && Boolean(state.professional)) ||
    (step === 2 && Boolean(state.day)) ||
    (step === 3 && Boolean(state.time)) ||
    (step === 4 && state.phone.trim().length >= 8) ||
    step === 5;

  const handleSelectService = (service: string) => {
    const professionals = serviceProfessionals[service] ?? [];
    const nextProfessional = professionals.length === 1 ? professionals[0] : "";

    setState({
      service,
      category: findCategoryForService(service),
      professional: nextProfessional,
      day: "",
      time: "",
      phone: state.phone,
    });
  };

  const handleNext = () => {
    if (step === 4 && state.phone.trim().length < 8) {
      setPhoneError("Ingresá un número válido para continuar.");
      return;
    }

    setPhoneError("");
    setStep((current) => Math.min(current + 1, stepLabels.length - 1));
  };

  const handleBack = () => {
    setPhoneError("");
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1d232b]/40 px-4 py-4 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        className="card-surface w-full max-w-4xl overflow-hidden rounded-[2rem] border-white/40 bg-[rgba(252,249,245,0.96)] shadow-[0_30px_80px_rgba(17,24,39,0.18)] transition-all"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-line/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(250,245,239,0.9))] px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Agendá tu turno</p>
              <h2
                id={dialogTitleId}
                className="mt-3 font-display text-[1.9rem] leading-[1.02] text-text sm:text-[2.3rem]"
              >
                {isConfirmed ? "Solicitud registrada" : "Reservá tu experiencia"}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-[1rem]">
                {isConfirmed
                  ? "Tu solicitud de turno fue registrada. Nos pondremos en contacto para confirmarlo."
                  : "Elegí tu servicio, profesional y horario disponible en un flujo simple y claro."}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-xl text-text"
              aria-label="Cerrar modal de reserva"
            >
              ×
            </button>
          </div>

          {!isConfirmed ? (
            <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {stepLabels.map((label, index) => {
                const isActive = index === step;
                const isDone = index < step;

                return (
                  <div key={label} className="flex flex-col gap-2">
                    <div
                      className={[
                        "h-1.5 rounded-full transition-colors",
                        isActive || isDone ? "bg-accent" : "bg-accent-soft",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "text-[0.72rem] uppercase tracking-[0.18em]",
                        isActive ? "text-text" : "text-muted",
                      ].join(" ")}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-8 sm:py-8">
          {isConfirmed ? (
            <SuccessState
              state={state}
              onClose={onClose}
            />
          ) : (
            <>
              {step === 0 ? (
                <StepChooseService
                  selectedService={state.service}
                  onSelectService={handleSelectService}
                />
              ) : null}
              {step === 1 ? (
                <StepChooseProfessional
                  selectedService={state.service}
                  selectedProfessional={state.professional}
                  onSelectProfessional={(professional) =>
                    setState((current) => ({ ...current, professional }))
                  }
                />
              ) : null}
              {step === 2 ? (
                <StepChooseDay
                  days={upcomingDays}
                  selectedDay={state.day}
                  onSelectDay={(day) =>
                    setState((current) => ({ ...current, day }))
                  }
                />
              ) : null}
              {step === 3 ? (
                <StepChooseTime
                  selectedTime={state.time}
                  onSelectTime={(time) =>
                    setState((current) => ({ ...current, time }))
                  }
                />
              ) : null}
              {step === 4 ? (
                <StepPhone
                  phone={state.phone}
                  error={phoneError}
                  onChangePhone={(phone) => {
                    setPhoneError("");
                    setState((current) => ({ ...current, phone }));
                  }}
                />
              ) : null}
              {step === 5 ? <StepSummary state={state} /> : null}
            </>
          )}
        </div>

        {!isConfirmed ? (
          <div className="border-t border-line/80 bg-white/45 px-5 py-4 sm:px-8">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={step === 0 ? onClose : handleBack}
                className="focus-ring inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-text"
              >
                {step === 0 ? "Cerrar" : "Volver"}
              </button>

              {step < stepLabels.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canContinue}
                  className={[
                    "premium-button min-w-40 px-7 py-3.5",
                    !canContinue ? "cursor-not-allowed opacity-50" : "",
                  ].join(" ")}
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="premium-button min-w-44 px-7 py-3.5"
                >
                  Confirmar turno
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StepChooseService({
  selectedService,
  onSelectService,
}: {
  selectedService: string;
  onSelectService: (service: string) => void;
}) {
  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-text">
          Elegí un servicio
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted">
          Seleccioná la categoría y después el tratamiento que mejor se adapte a
          lo que buscás hoy.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {bookingCategories.map((category) => (
          <section
            key={category.name}
            className="rounded-[1.6rem] border border-line bg-white/65 p-4 sm:p-5"
            aria-label={`Servicios de ${category.name}`}
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted">
              {category.name}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.services.map((service) => {
                const isSelected = selectedService === service;

                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => onSelectService(service)}
                    className={[
                      "focus-ring rounded-full border px-4 py-2.5 text-left text-sm leading-5 transition-colors",
                      isSelected
                        ? "border-accent bg-accent text-white"
                        : "border-line bg-surface text-text hover:bg-accent-soft",
                    ].join(" ")}
                    aria-pressed={isSelected}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function StepChooseProfessional({
  selectedService,
  selectedProfessional,
  onSelectProfessional,
}: {
  selectedService: string;
  selectedProfessional: string;
  onSelectProfessional: (professional: string) => void;
}) {
  const professionals = serviceProfessionals[selectedService] ?? [];

  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-text">
          Elegí profesional
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted">
          Para <span className="font-medium text-text">{selectedService}</span>{" "}
          tenemos estas opciones disponibles.
        </p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {professionals.map((professional) => {
          const isSelected = selectedProfessional === professional;

          return (
            <button
              key={professional}
              type="button"
              onClick={() => onSelectProfessional(professional)}
              className={[
                "focus-ring rounded-[1.5rem] border px-5 py-5 text-left transition-colors",
                isSelected
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white/70 text-text hover:bg-accent-soft",
              ].join(" ")}
              aria-pressed={isSelected}
            >
              <p className="text-base font-semibold">{professional}</p>
              <p
                className={[
                  "mt-2 text-sm leading-6",
                  isSelected ? "text-white/80" : "text-muted",
                ].join(" ")}
              >
                {professional === "Indistinto"
                  ? "Asignación flexible según disponibilidad."
                  : "Atención personalizada para este tratamiento."}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepChooseDay({
  days,
  selectedDay,
  onSelectDay,
}: {
  days: string[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
}) {
  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-text">
          Elegí un día
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted">
          Mostramos las próximas fechas disponibles para que elijas la que mejor
          te quede.
        </p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => {
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDay(day)}
              className={[
                "focus-ring rounded-[1.4rem] border px-5 py-4 text-left text-base font-medium transition-colors",
                isSelected
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white/70 text-text hover:bg-accent-soft",
              ].join(" ")}
              aria-pressed={isSelected}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepChooseTime({
  selectedTime,
  onSelectTime,
}: {
  selectedTime: string;
  onSelectTime: (time: string) => void;
}) {
  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-text">
          Elegí un horario
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted">
          Algunos horarios se muestran ocupados para simular disponibilidad real
          del estudio.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {bookingTimes.map((slot) => {
          const isSelected = selectedTime === slot.label;

          return (
            <button
              key={slot.label}
              type="button"
              disabled={!slot.available}
              onClick={() => onSelectTime(slot.label)}
              className={[
                "focus-ring rounded-[1.4rem] border px-4 py-4 text-sm font-medium transition-colors sm:text-base",
                !slot.available
                  ? "cursor-not-allowed border-neutral-400/70 bg-neutral-300/80 text-neutral-700"
                  : isSelected
                    ? "border-accent bg-accent text-white"
                    : "border-line bg-white/70 text-text hover:bg-accent-soft",
              ].join(" ")}
            >
              {slot.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepPhone({
  phone,
  error,
  onChangePhone,
}: {
  phone: string;
  error: string;
  onChangePhone: (phone: string) => void;
}) {
  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-text">
          Dejanos tu teléfono o WhatsApp
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted">
          Usaremos este contacto para confirmar tu turno y enviarte la
          información final.
        </p>
      </div>

      <div className="mt-7 max-w-xl">
        <label htmlFor="booking-phone" className="text-sm font-medium text-text">
          Número de contacto
        </label>
        <input
          id="booking-phone"
          name="booking-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => onChangePhone(event.target.value)}
          placeholder="+54 11 4567 8901"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "booking-phone-error" : undefined}
          className={[
            "focus-ring mt-3 w-full rounded-[1.2rem] border bg-white/80 px-4 py-3.5 text-base text-text placeholder:text-muted/70",
            error ? "border-red-400" : "border-line",
          ].join(" ")}
        />
        {error ? (
          <p id="booking-phone-error" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Ejemplo: +54 11 4567 8901
          </p>
        )}
      </div>
    </div>
  );
}

function StepSummary({ state }: { state: BookingState }) {
  return (
    <div>
      <div className="max-w-2xl">
        <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-text">
          Revisá tu solicitud
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted">
          Este es el resumen de tu turno antes de enviar la solicitud.
        </p>
      </div>

      <div className="mt-7 rounded-[1.8rem] border border-line bg-white/75 p-5 shadow-soft sm:p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <SummaryItem label="Servicio" value={state.service} />
          <SummaryItem label="Profesional" value={state.professional} />
          <SummaryItem label="Día" value={state.day} />
          <SummaryItem label="Horario" value={state.time} />
          <SummaryItem label="WhatsApp" value={state.phone} />
          <SummaryItem label="Categoría" value={state.category} />
        </dl>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-line bg-surface px-4 py-4">
      <dt className="text-[0.72rem] uppercase tracking-[0.2em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-base font-medium text-text">{value}</dd>
    </div>
  );
}

function SuccessState({
  state,
  onClose,
}: {
  state: BookingState;
  onClose: () => void;
}) {
  return (
    <div className="py-2">
      <div className="rounded-[1.9rem] border border-line bg-white/75 p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-text">
              Confirmación demo
            </span>
            <h3 className="mt-4 font-display text-[2rem] leading-[1.04] text-text">
              Tu solicitud de turno fue registrada
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-[1rem]">
              Nos pondremos en contacto para confirmarlo. Este flujo funciona
              como una demostración frontend, por lo que no se envían datos a
              ningún backend.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-surface p-4 sm:min-w-[18rem]">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-muted">
              Resumen
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-text">
              <li>
                <span className="text-muted">Servicio:</span> {state.service}
              </li>
              <li>
                <span className="text-muted">Profesional:</span>{" "}
                {state.professional}
              </li>
              <li>
                <span className="text-muted">Día:</span> {state.day}
              </li>
              <li>
                <span className="text-muted">Horario:</span> {state.time}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="premium-button min-w-40 px-7 py-3.5"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
