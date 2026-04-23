"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import {
  appointments as baseAppointments,
  staffProfiles,
  type Appointment,
  type AppointmentStatus,
  type StaffProfile,
  weekDays,
  weekLabel,
} from "@/lib/staffSchedule";

const statusMeta: Record<
  AppointmentStatus,
  {
    label: string;
    helper: string;
    className: string;
  }
> = {
  awaiting_deposit: {
    label: "Pendiente de seña",
    helper: "Reservado, falta registrar la seña.",
    className: "bg-rose-100 text-rose-800",
  },
  deposit_paid: {
    label: "Seña abonada",
    helper: "La clienta senio, falta confirmar el turno final.",
    className: "bg-amber-100 text-amber-800",
  },
  confirmed: {
    label: "Confirmado",
    helper: "Turno confirmado y listo para atender.",
    className: "bg-emerald-100 text-emerald-800",
  },
  completed: {
    label: "Realizado",
    helper: "El servicio ya se realizo.",
    className: "bg-slate-200 text-slate-800",
  },
  cancelled: {
    label: "Cancelado",
    helper: "El turno no sigue activo.",
    className: "bg-zinc-200 text-zinc-700",
  },
};

const SESSION_STORAGE_KEY = "karina-studio-demo-session";
const APPOINTMENTS_STORAGE_KEY = "karina-studio-demo-appointments-v2";
const statusOrder: AppointmentStatus[] = [
  "awaiting_deposit",
  "deposit_paid",
  "confirmed",
  "completed",
  "cancelled",
];

function getProfile(profileId: string) {
  return staffProfiles.find((profile) => profile.id === profileId) ?? staffProfiles[0];
}

function getAppointmentsForProfile(profile: StaffProfile, appointments: Appointment[]) {
  if (profile.viewScope === "global") {
    return appointments;
  }

  return appointments.filter((appointment) => appointment.staffId === profile.id);
}

function formatHours(totalMinutes: number) {
  const hours = totalMinutes / 60;
  return hours % 1 === 0 ? `${hours} hs` : `${hours.toFixed(1)} hs`;
}

function getAccessDescription(profile: StaffProfile) {
  if (profile.role === "secretary") {
    return "Secretaria con gestion global";
  }

  if (profile.role === "owner") {
    return "Duena con gestion global";
  }

  if (profile.canManageAppointments) {
    return "Duena y empleada con gestion global";
  }

  return "Trabajadora con agenda propia";
}

function AppointmentCard({
  appointment,
  showStaff = false,
  canManage = false,
  onStatusChange,
}: {
  appointment: Appointment;
  showStaff?: boolean;
  canManage?: boolean;
  onStatusChange?: (appointmentId: string, nextStatus: AppointmentStatus) => void;
}) {
  const staff = getProfile(appointment.staffId);
  const status = statusMeta[appointment.status];

  return (
    <article className="rounded-[1.4rem] border border-line bg-white/80 p-4 shadow-soft">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text">
              {appointment.time}
            </p>
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-text">
              {appointment.durationMinutes} min
            </span>
            {showStaff ? (
              <span
                className="rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white"
                style={{ backgroundColor: staff.accent }}
              >
                {staff.name}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-text">{appointment.client}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{appointment.service}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
            {appointment.room}
          </p>
          {appointment.notes ? (
            <p className="mt-3 max-w-[28rem] text-sm leading-6 text-muted">{appointment.notes}</p>
          ) : null}
        </div>

        <div className="lg:max-w-[16rem] lg:text-right">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${status.className}`}
          >
            {status.label}
          </span>
          <p className="mt-3 text-sm leading-6 text-muted">{status.helper}</p>

          {canManage && onStatusChange ? (
            <div className="mt-4">
              <label
                htmlFor={`status-${appointment.id}`}
                className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted"
              >
                Gestionar estado
              </label>
              <select
                id={`status-${appointment.id}`}
                value={appointment.status}
                onChange={(event) =>
                  onStatusChange(appointment.id, event.target.value as AppointmentStatus)
                }
                className="focus-ring mt-2 w-full rounded-[1rem] border border-line bg-white px-3 py-2 text-sm text-text shadow-soft lg:text-right"
              >
                {statusOrder.map((statusId) => (
                  <option key={statusId} value={statusId}>
                    {statusMeta[statusId].label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ProfileAccessCard({
  profile,
  isActive,
  onSelect,
}: {
  profile: StaffProfile;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`focus-ring rounded-[1.5rem] border p-5 text-left transition ${
        isActive
          ? "border-transparent bg-accent text-white shadow-card"
          : "border-line bg-white/80 text-text shadow-soft hover:-translate-y-0.5 hover:bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] opacity-75">
            {profile.badge}
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{profile.name}</h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${
            isActive ? "bg-white/15 text-white" : "text-white"
          }`}
          style={isActive ? undefined : { backgroundColor: profile.accent }}
        >
          {profile.accessLabel}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 opacity-85">{profile.portalDescription}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] opacity-70">
        {profile.availability}
      </p>
    </button>
  );
}

export function StaffPortal() {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [entryProfileId, setEntryProfileId] = useState("mili");
  const [accessCode, setAccessCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [managedAppointments, setManagedAppointments] =
    useState<Appointment[]>(baseAppointments);

  const hasSession = selectedProfileId !== null;
  const selectedEntryProfile = getProfile(entryProfileId);
  const activeProfile = getProfile(selectedProfileId ?? entryProfileId);
  const hasGlobalView = activeProfile.viewScope === "global";
  const canManageAppointments = activeProfile.canManageAppointments;
  const visibleAppointments = hasSession
    ? getAppointmentsForProfile(activeProfile, managedAppointments)
    : [];
  const totalMinutes = visibleAppointments.reduce(
    (accumulator, appointment) => accumulator + appointment.durationMinutes,
    0,
  );
  const firstAppointment = visibleAppointments[0];
  const groupedAppointments = weekDays.map((day) => ({
    ...day,
    items: visibleAppointments.filter((appointment) => appointment.dayId === day.id),
  }));
  const statusCounts = statusOrder.reduce(
    (accumulator, status) => ({
      ...accumulator,
      [status]: visibleAppointments.filter((appointment) => appointment.status === status).length,
    }),
    {} as Record<AppointmentStatus, number>,
  );
  const teamStatusCounts = statusOrder.reduce(
    (accumulator, status) => ({
      ...accumulator,
      [status]: managedAppointments.filter((appointment) => appointment.status === status).length,
    }),
    {} as Record<AppointmentStatus, number>,
  );
  const loadByWorker = staffProfiles
    .filter((profile) => profile.role === "worker")
    .map((profile) => {
      const profileAppointments = managedAppointments.filter(
        (appointment) => appointment.staffId === profile.id,
      );

      return {
        ...profile,
        appointmentsCount: profileAppointments.length,
        reservedMinutes: profileAppointments.reduce(
          (accumulator, appointment) => accumulator + appointment.durationMinutes,
          0,
        ),
        awaitingDeposit: profileAppointments.filter(
          (appointment) => appointment.status === "awaiting_deposit",
        ).length,
      };
    });

  useEffect(() => {
    const storedProfileId = window.localStorage.getItem(SESSION_STORAGE_KEY);
    const storedAppointments = window.localStorage.getItem(APPOINTMENTS_STORAGE_KEY);

    if (storedProfileId && staffProfiles.some((profile) => profile.id === storedProfileId)) {
      setSelectedProfileId(storedProfileId);
      setEntryProfileId(storedProfileId);
    }

    if (storedAppointments) {
      try {
        const parsedAppointments = JSON.parse(storedAppointments) as Appointment[];
        if (Array.isArray(parsedAppointments) && parsedAppointments.length > 0) {
          setManagedAppointments(parsedAppointments);
        }
      } catch {
        window.localStorage.removeItem(APPOINTMENTS_STORAGE_KEY);
      }
    }

    setIsHydrated(true);
  }, []);

  function handleProfileSelect(profileId: string) {
    setEntryProfileId(profileId);
    setAccessCode("");
    setLoginError("");
  }

  function handleLogin() {
    const normalizedCode = accessCode.trim().toUpperCase();

    if (!normalizedCode) {
      setLoginError("Ingresa el codigo demo para continuar.");
      return;
    }

    if (normalizedCode !== selectedEntryProfile.demoCode) {
      setLoginError("El codigo demo no coincide con el perfil seleccionado.");
      return;
    }

    setSelectedProfileId(entryProfileId);
    setLoginError("");
    window.localStorage.setItem(SESSION_STORAGE_KEY, entryProfileId);
  }

  function handleLogout() {
    setSelectedProfileId(null);
    setAccessCode("");
    setLoginError("");
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  function handleStatusChange(appointmentId: string, nextStatus: AppointmentStatus) {
    setManagedAppointments((currentAppointments) => {
      const nextAppointments = currentAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: nextStatus }
          : appointment,
      );

      window.localStorage.setItem(
        APPOINTMENTS_STORAGE_KEY,
        JSON.stringify(nextAppointments),
      );

      return nextAppointments;
    });
  }

  function handleResetAppointments() {
    setManagedAppointments(baseAppointments);
    window.localStorage.removeItem(APPOINTMENTS_STORAGE_KEY);
  }

  if (!isHydrated) {
    return (
      <main className="min-h-screen">
        <section className="section-padding">
          <Container>
            <div className="card-surface p-8 text-center">
              <p className="eyebrow">Portal interno demo</p>
              <p className="mt-4 text-lg text-text">Cargando acceso...</p>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  if (!hasSession) {
    return (
      <main className="min-h-screen pb-16">
        <section className="relative overflow-hidden border-b border-line bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,255,255,0)_46%),linear-gradient(180deg,#fbf7f3_0%,#f3eee8_100%)]">
          <Container className="py-8 sm:py-10">
            <Link
              href="/"
              className="focus-ring inline-flex items-center rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-text shadow-soft transition hover:-translate-y-0.5"
            >
              Volver a la landing
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div>
                <p className="eyebrow">Acceso interno demo</p>
                <h1 className="mt-4 max-w-3xl font-display text-[2.5rem] leading-[1.02] text-text sm:text-[3.5rem]">
                  Elige quien entra al portal de agenda
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-[1.02rem]">
                  Las duenas y la secretaria pueden gestionar estados de turnos y
                  señas. Las trabajadoras entran a su agenda personal.
                </p>
              </div>

              <div className="card-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  Estado del portal
                </p>
                <p className="mt-3 text-2xl font-semibold text-text">{weekLabel}</p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {managedAppointments.length} turnos demo cargados y{" "}
                  {teamStatusCounts.awaiting_deposit} pendientes de seña.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="section-padding">
          <Container>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="grid gap-4 md:grid-cols-2">
                {staffProfiles.map((profile) => (
                  <ProfileAccessCard
                    key={profile.id}
                    profile={profile}
                    isActive={profile.id === entryProfileId}
                    onSelect={() => handleProfileSelect(profile.id)}
                  />
                ))}
              </div>

              <aside className="card-surface p-6 sm:p-7">
                <p className="eyebrow">Login demo</p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] text-text">
                  {selectedEntryProfile.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {selectedEntryProfile.portalDescription}
                </p>

                <div className="mt-6 rounded-[1.5rem] border border-line bg-white/80 p-5 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    Tipo de acceso
                  </p>
                  <p className="mt-2 text-lg font-semibold text-text">
                    {getAccessDescription(selectedEntryProfile)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {selectedEntryProfile.availability}
                  </p>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="demo-access-code"
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-muted"
                  >
                    Codigo de acceso
                  </label>
                  <input
                    id="demo-access-code"
                    type="password"
                    value={accessCode}
                    onChange={(event) => {
                      setAccessCode(event.target.value.toUpperCase());
                      if (loginError) {
                        setLoginError("");
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    placeholder="Ingresa el codigo demo"
                    className="focus-ring mt-3 w-full rounded-[1.1rem] border border-line bg-white px-4 py-3 text-sm text-text shadow-soft placeholder:text-muted"
                  />
                  {loginError ? (
                    <p className="mt-3 text-sm leading-6 text-rose-700">{loginError}</p>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-muted">
                      Usa el codigo asignado al perfil seleccionado.
                    </p>
                  )}
                </div>

                <button type="button" onClick={handleLogin} className="premium-button mt-6 w-full">
                  Entrar al portal
                </button>

                <p className="mt-4 text-xs leading-6 text-muted">
                  La sesion queda guardada en este navegador hasta que cierres el
                  acceso manualmente.
                </p>

                <div className="mt-6 rounded-[1.5rem] border border-dashed border-line bg-[#fcfaf7] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    Credenciales demo
                  </p>
                  <div className="mt-4 space-y-3">
                    {staffProfiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="font-medium text-text">{profile.name}</span>
                        <code className="rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-[0.14em] text-text">
                          {profile.demoCode}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-16">
      <section className="relative overflow-hidden border-b border-line bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,255,255,0)_46%),linear-gradient(180deg,#fbf7f3_0%,#f3eee8_100%)]">
        <Container className="py-8 sm:py-10">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="focus-ring inline-flex items-center rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-text shadow-soft transition hover:-translate-y-0.5"
            >
              Volver a la landing
            </Link>
            {canManageAppointments ? (
              <button
                type="button"
                onClick={handleResetAppointments}
                className="focus-ring inline-flex items-center rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-text shadow-soft transition hover:-translate-y-0.5"
              >
                Restaurar demo
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleLogout}
              className="focus-ring inline-flex items-center rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-text shadow-soft transition hover:-translate-y-0.5"
            >
              Cerrar sesion
            </button>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <p className="eyebrow">
                {activeProfile.role === "secretary"
                  ? "Portal secretaria"
                  : activeProfile.role === "owner"
                    ? "Portal duena"
                    : canManageAppointments
                      ? "Portal duena y empleada"
                      : "Portal trabajadora"}
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-[2.5rem] leading-[1.02] text-text sm:text-[3.5rem]">
                {hasGlobalView
                  ? "Gestion general de la agenda semanal"
                  : `Agenda semanal de ${activeProfile.name}`}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-[1.02rem]">
                {canManageAppointments
                  ? "Desde aqui puedes gestionar estados de turnos, registrar señas y seguir la operacion completa del equipo."
                  : "Aqui cada trabajadora entra directo a su propia agenda semanal para enfocarse solo en sus turnos."}
              </p>
            </div>

            <div className="card-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                Sesion activa
              </p>
              <p className="mt-3 text-2xl font-semibold text-text">{activeProfile.name}</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {activeProfile.specialty}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted">
                {weekLabel}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-line bg-white/75 px-5 py-4 text-sm leading-7 text-muted shadow-soft">
            {canManageAppointments ? (
              <p>
                Esta sesion puede gestionar {managedAppointments.length} turnos, seguir{" "}
                {teamStatusCounts.awaiting_deposit} pendientes de seña y revisar{" "}
                {teamStatusCounts.deposit_paid} reservas con seña ya registrada.
              </p>
            ) : (
              <p>
                Sesion de {activeProfile.name} iniciada. Disponibilidad general:{" "}
                {activeProfile.availability}.
              </p>
            )}
          </div>
        </Container>
      </section>

      {hasGlobalView ? (
        <section className="pt-10">
          <Container>
            <div className="card-surface p-6 sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="eyebrow">Gestion de estados</p>
                  <h2 className="mt-3 font-display text-[2rem] leading-none text-text">
                    Seguimiento de seña y confirmacion
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                    Los estados estan pensados para un flujo simple: pendiente de seña,
                    seña abonada, confirmado, realizado o cancelado.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-5">
                {statusOrder.map((status) => (
                  <article
                    key={status}
                    className="rounded-[1.5rem] border border-line bg-white/80 p-5 shadow-soft"
                  >
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${statusMeta[status].className}`}
                    >
                      {statusMeta[status].label}
                    </span>
                    <p className="mt-4 text-2xl font-semibold text-text">
                      {teamStatusCounts[status]}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {statusMeta[status].helper}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {hasGlobalView ? (
        <section className="pt-10">
          <Container>
            <div className="card-surface p-6 sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="eyebrow">Carga del equipo</p>
                  <h2 className="mt-3 font-display text-[2rem] leading-none text-text">
                    Resumen rapido por trabajadora
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                    Aqui puedes ver quien tiene mas carga semanal y en que perfiles
                    faltan señas por registrar.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-4">
                {loadByWorker.map((profile) => (
                  <article
                    key={profile.id}
                    className="rounded-[1.5rem] border border-line bg-white/80 p-5 shadow-soft"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                          {profile.accessLabel}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-text">
                          {profile.name}
                        </h3>
                      </div>
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: profile.accent }}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {profile.specialty}
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-[1.1rem] bg-[#f7f2ec] p-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted">
                          Turnos
                        </p>
                        <p className="mt-2 text-xl font-semibold text-text">
                          {profile.appointmentsCount}
                        </p>
                      </div>
                      <div className="rounded-[1.1rem] bg-[#f7f2ec] p-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted">
                          Horas
                        </p>
                        <p className="mt-2 text-xl font-semibold text-text">
                          {formatHours(profile.reservedMinutes)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-muted">
                      {profile.awaitingDeposit > 0
                        ? `${profile.awaitingDeposit} turnos siguen pendientes de seña.`
                        : "No tiene pendientes de seña esta semana."}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="section-padding">
        <Container>
          <div className="card-surface p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow">{hasGlobalView ? "Vista activa" : "Tu resumen"}</p>
                <h2 className="mt-3 font-display text-[2rem] leading-none text-text">
                  {hasGlobalView ? "Panel general de agenda" : "Agenda personal de la semana"}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                  {canManageAppointments
                    ? "Cada turno puede cambiarse de estado desde esta misma pantalla y el cambio queda guardado en el navegador."
                    : "La trabajadora solo necesita ver sus turnos, tiempos reservados y estados actuales."}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[1.5rem] border border-line bg-white/80 p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  Perfil activo
                </p>
                <p className="mt-3 text-2xl font-semibold text-text">{activeProfile.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{activeProfile.specialty}</p>
              </div>
              <div className="rounded-[1.5rem] border border-line bg-white/80 p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  Turnos cargados
                </p>
                <p className="mt-3 text-2xl font-semibold text-text">{visibleAppointments.length}</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {hasGlobalView
                    ? "Agenda completa del equipo para la semana."
                    : "Solo tus turnos visibles para esta semana."}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-line bg-white/80 p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                  Horas reservadas
                </p>
                <p className="mt-3 text-2xl font-semibold text-text">{formatHours(totalMinutes)}</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {hasGlobalView
                    ? `${teamStatusCounts.confirmed} turnos confirmados y ${teamStatusCounts.completed} realizados.`
                    : `${statusCounts.confirmed} confirmados en tu vista y ${statusCounts.deposit_paid} con seña.`}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-dashed border-line bg-[#fcfaf7] px-5 py-4 text-sm leading-7 text-muted">
              {canManageAppointments ? (
                <p>
                  Mili, Flor y Kiki pueden gestionar los estados del turno. El flujo
                  sugerido es: pendiente de seña, seña abonada, confirmado y luego
                  realizado o cancelado.
                </p>
              ) : (
                <p>
                  {activeProfile.name} ve solo su semana y puede consultar el estado
                  actual de cada clienta.
                </p>
              )}
              {firstAppointment ? (
                <p>
                  Primer turno visible: {firstAppointment.time} con {firstAppointment.client}.
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid gap-5">
            {groupedAppointments.map((day) => (
              <section key={day.id} className="card-surface p-5 sm:p-6">
                <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                      {day.shortLabel}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-text">{day.label}</h2>
                  </div>
                  <p className="text-sm leading-6 text-muted">
                    {day.items.length > 0
                      ? `${day.items.length} turno${day.items.length > 1 ? "s" : ""} cargado${day.items.length > 1 ? "s" : ""}`
                      : "Sin turnos cargados"}
                  </p>
                </div>

                {day.items.length > 0 ? (
                  <div className="mt-5 grid gap-4">
                    {day.items.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        showStaff={hasGlobalView}
                        canManage={canManageAppointments}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-[1.35rem] border border-dashed border-line bg-white/60 p-5 text-sm leading-7 text-muted">
                    {hasGlobalView
                      ? "Dia libre en la agenda general."
                      : "No tenes turnos para este dia."}
                  </div>
                )}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
