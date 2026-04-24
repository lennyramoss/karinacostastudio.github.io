export type PortalRole = "worker" | "secretary" | "owner";
export type PortalViewScope = "personal" | "global";

export type StaffProfile = {
  id: string;
  name: string;
  role: PortalRole;
  specialty: string;
  badge: string;
  accent: string;
  availability: string;
  accessLabel: string;
  portalDescription: string;
  demoCode: string;
  viewScope: PortalViewScope;
  canManageAppointments: boolean;
};

export type AppointmentStatus =
  | "awaiting_deposit"
  | "deposit_paid"
  | "confirmed"
  | "completed"
  | "cancelled";

export type Appointment = {
  id: string;
  staffId: string;
  dayId: string;
  time: string;
  durationMinutes: number;
  client: string;
  service: string;
  status: AppointmentStatus;
  notes?: string;
};

export const weekLabel = "Semana demo del 20 al 25 de abril";

export const weekDays = [
  { id: "monday", label: "Lunes", shortLabel: "Lun 20" },
  { id: "tuesday", label: "Martes", shortLabel: "Mar 21" },
  { id: "wednesday", label: "Miercoles", shortLabel: "Mie 22" },
  { id: "thursday", label: "Jueves", shortLabel: "Jue 23" },
  { id: "friday", label: "Viernes", shortLabel: "Vie 24" },
  { id: "saturday", label: "Sabado", shortLabel: "Sab 25" },
] as const;

export const staffProfiles: StaffProfile[] = [
  {
    id: "flor",
    name: "Flor",
    role: "owner",
    specialty: "Duena | Vista general sin agenda propia",
    badge: "Duena",
    accent: "#7ad3da",
    availability: "Acceso de supervision y consulta",
    accessLabel: "Direccion Flor",
    portalDescription:
      "Entra para revisar la agenda general del equipo sin figurar como trabajadora.",
    demoCode: "FLOR2026",
    viewScope: "global",
    canManageAppointments: true,
  },
  {
    id: "kiki",
    name: "Kiki",
    role: "worker",
    specialty: "Duena y empleada | Seguimiento de agenda y servicios",
    badge: "Duena y empleada",
    accent: "#c6f371",
    availability: "Mar a Sab de 09:30 a 18:30",
    accessLabel: "Direccion Kiki",
    portalDescription:
      "Accede a la agenda semanal y acompana la operacion diaria del estudio.",
    demoCode: "KIKI2026",
    viewScope: "global",
    canManageAppointments: true,
  },
  {
    id: "candela",
    name: "Candela",
    role: "worker",
    specialty: "Lifting, cejas y detalle de mirada",
    badge: "Empleada",
    accent: "#b17a63",
    availability: "Lun a Vie de 10:00 a 18:00",
    accessLabel: "Cabina Candela",
    portalDescription:
      "Mira tus turnos de la semana y organiza rapido tus bloques de trabajo.",
    demoCode: "CANDE2026",
    viewScope: "personal",
    canManageAppointments: false,
  },
  {
    id: "candelaria",
    name: "Candelaria",
    role: "worker",
    specialty: "Labios y retoques suaves",
    badge: "Empleada",
    accent: "#f1bcbc",
    availability: "Lun, Mie, Jue y Vie de 10:00 a 18:00",
    accessLabel: "Cabina Candelaria",
    portalDescription:
      "Consulta tu agenda personal y detecta al instante turnos confirmados y pendientes.",
    demoCode: "CANDELARIA2026",
    viewScope: "personal",
    canManageAppointments: false,
  },
  {
    id: "agustina",
    name: "Agustina",
    role: "worker",
    specialty: "Faciales y cuidado de piel",
    badge: "Empleada",
    accent: "#a3f8eb",
    availability: "Mar a Sab de 10:30 a 19:00",
    accessLabel: "Gabinete Agustina",
    portalDescription:
      "Ten a mano tus servicios de la semana y el detalle de cada clienta.",
    demoCode: "AGUS2026",
    viewScope: "personal",
    canManageAppointments: false,
  },
  {
    id: "mili",
    name: "Mili",
    role: "secretary",
    specialty: "Vista completa del equipo y gestion de turnos",
    badge: "Acceso total",
    accent: "#1e2730",
    availability: "Gestion general y seguimiento de agenda",
    accessLabel: "Recepcion",
    portalDescription:
      "Visualiza la agenda completa del equipo, administra estados y hace seguimiento de señas.",
    demoCode: "MILI2026",
    viewScope: "global",
    canManageAppointments: true,
  },
];

export const appointments: Appointment[] = [
  {
    id: "apt-01",
    staffId: "kiki",
    dayId: "monday",
    time: "10:00",
    durationMinutes: 60,
    client: "Lucia Gomez",
    service: "Diseno de servicio personalizado",
    status: "deposit_paid",
    notes: "Primera sesion",
  },
  {
    id: "apt-02",
    staffId: "candela",
    dayId: "monday",
    time: "11:00",
    durationMinutes: 45,
    client: "Camila Diaz",
    service: "Diseno de cejas",
    status: "confirmed",
  },
  {
    id: "apt-03",
    staffId: "agustina",
    dayId: "monday",
    time: "15:30",
    durationMinutes: 75,
    client: "Julieta Sosa",
    service: "Limpieza facial profunda",
    status: "completed",
  },
  {
    id: "apt-04",
    staffId: "kiki",
    dayId: "tuesday",
    time: "12:00",
    durationMinutes: 60,
    client: "Valentina Ruiz",
    service: "Seguimiento y retoque",
    status: "deposit_paid",
  },
  {
    id: "apt-05",
    staffId: "candela",
    dayId: "tuesday",
    time: "16:00",
    durationMinutes: 50,
    client: "Agustina Perez",
    service: "Laminado de cejas",
    status: "awaiting_deposit",
  },
  {
    id: "apt-06",
    staffId: "agustina",
    dayId: "wednesday",
    time: "10:30",
    durationMinutes: 60,
    client: "Sofia Medina",
    service: "Dermaplaning glow",
    status: "confirmed",
  },
  {
    id: "apt-07",
    staffId: "candelaria",
    dayId: "wednesday",
    time: "17:00",
    durationMinutes: 45,
    client: "Brenda Castro",
    service: "Babylips",
    status: "awaiting_deposit",
    notes: "Confirmar por WhatsApp",
  },
  {
    id: "apt-08",
    staffId: "candela",
    dayId: "thursday",
    time: "09:30",
    durationMinutes: 45,
    client: "Rocio Alvarez",
    service: "Perfilado y henna",
    status: "completed",
  },
  {
    id: "apt-09",
    staffId: "agustina",
    dayId: "thursday",
    time: "13:00",
    durationMinutes: 90,
    client: "Milagros Ferreyra",
    service: "Higiene facial con extracciones",
    status: "deposit_paid",
  },
  {
    id: "apt-10",
    staffId: "kiki",
    dayId: "friday",
    time: "11:30",
    durationMinutes: 60,
    client: "Mora Rivas",
    service: "Plan de servicio y asesoramiento",
    status: "confirmed",
  },
  {
    id: "apt-11",
    staffId: "candela",
    dayId: "friday",
    time: "14:30",
    durationMinutes: 45,
    client: "Paula Vera",
    service: "Lifting de pestanas",
    status: "deposit_paid",

  },
  {
    id: "apt-12",
    staffId: "kiki",
    dayId: "friday",
    time: "17:30",
    durationMinutes: 60,
    client: "Daniela Mendez",
    service: "Control y seguimiento de tratamiento",
    status: "awaiting_deposit",
  },
  {
    id: "apt-13",
    staffId: "candelaria",
    dayId: "saturday",
    time: "10:00",
    durationMinutes: 45,
    client: "Lara Funes",
    service: "Retoque de labios",
    status: "deposit_paid",
  },
  {
    id: "apt-14",
    staffId: "agustina",
    dayId: "saturday",
    time: "12:30",
    durationMinutes: 75,
    client: "Florencia Neri",
    service: "Radiofrecuencia facial",
    status: "confirmed",
  },
  {
    id: "apt-15",
    staffId: "kiki",
    dayId: "monday",
    time: "13:30",
    durationMinutes: 60,
    client: "Martina Lopez",
    service: "Consulta de seguimiento",
    status: "completed",
  },
  {
    id: "apt-16",
    staffId: "candelaria",
    dayId: "tuesday",
    time: "10:30",
    durationMinutes: 60,
    client: "Ariana Suarez",
    service: "Hydra lips",
    status: "deposit_paid",
  },
  {
    id: "apt-17",
    staffId: "candela",
    dayId: "wednesday",
    time: "15:00",
    durationMinutes: 45,
    client: "Micaela Ponce",
    service: "Perfilado y henna",
    status: "confirmed",
  },
  {
    id: "apt-18",
    staffId: "candela",
    dayId: "thursday",
    time: "16:30",
    durationMinutes: 50,
    client: "Zoe Castillo",
    service: "Lifting de pestanas",
    status: "awaiting_deposit",
    notes: "Reconfirmar asistencia",
  },
  {
    id: "apt-19",
    staffId: "kiki",
    dayId: "friday",
    time: "16:00",
    durationMinutes: 45,
    client: "Candela Rios",
    service: "Evaluacion de tratamiento",
    status: "cancelled",
  },
  {
    id: "apt-20",
    staffId: "candela",
    dayId: "saturday",
    time: "11:30",
    durationMinutes: 45,
    client: "Emma Torres",
    service: "Perfilado express",
    status: "deposit_paid",
  },
];
