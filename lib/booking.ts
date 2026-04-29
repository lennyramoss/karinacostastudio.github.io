export type BookingCategory = {
  name: string;
  services: string[];
};

export const bookingCategories: BookingCategory[] = [
  {
    name: "Cejas",
    services: [
      "Diseño y perfilado",
      "Laminado de cejas",
      "Color touch",
      "Microblading",
      "Threading",
      "Lifting",
      "Nutrición y botox en cejas y pestañas",
      "Pestañas pelo por pelo",
    ],
  },
  {
    name: "Labios",
    services: ["Pixel lips", "Hidra lips", "Babylips"],
  },
  {
    name: "Faciales",
    services: [
      "Limpiezas faciales",
      "Dermapen",
      "Dermaplaning",
      "Tratamientos personalizados",
    ],
  },
];

export const serviceProfessionals: Record<string, string[]> = {
  "Diseño y perfilado": ["Agustina", "Candela", "Candelaria", "Kiki", "Indistinto"],
  "Laminado de cejas": ["Agustina", "Candela", "Candelaria", "Kiki", "Indistinto"],
  "Color touch": ["Agustina", "Candela", "Candelaria", "Kiki", "Indistinto"],
  Threading: ["Agustina", "Candela", "Candelaria", "Kiki"],
  Lifting: ["Agustina", "Candela", "Candelaria", "Kiki"],
  "Nutrición y botox en cejas y pestañas": ["Agustina", "Candela", "Candelaria", "Kiki"],
  "Pestañas pelo por pelo": ["Agustina", "Candela", "Candelaria", "Kiki"],
  Microblading: ["Agustina", "Candela", "Candelaria", "Kiki"],
  "Pixel lips": ["Agustina", "Candela", "Candelaria", "Kiki"],
  "Hidra lips": ["Agustina", "Candela", "Candelaria", "Kiki", "Indistinto"],
  Babylips: ["Agustina", "Candela", "Candelaria", "Kiki", "Indistinto"],
  "Limpiezas faciales": ["Agustina", "Candela", "Candelaria", "Kiki", "Indistinto"],
  Dermapen: ["Agustina", "Candela", "Candelaria", "Kiki"],
  Dermaplaning: ["Agustina", "Candela", "Candelaria", "Kiki", "Indistinto"],
  "Tratamientos personalizados": ["Agustina", "Candela", "Candelaria", "Kiki", "Indistinto"],
};

export const bookingTimes = [
  { label: "09:00", available: true },
  { label: "10:30", available: true },
  { label: "12:00", available: false },
  { label: "15:00", available: true },
  { label: "16:30", available: false },
  { label: "18:00", available: true },
];

export const stepLabels = [
  "Servicio",
  "Profesional",
  "Día",
  "Horario",
  "Contacto",
  "Resumen",
] as const;

const weekdayFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
});

const dayFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
});

export function getUpcomingBookingDays(count = 6) {
  const days: string[] = [];
  const current = new Date();
  current.setHours(12, 0, 0, 0);

  while (days.length < count) {
    current.setDate(current.getDate() + 1);
    const weekday = current.getDay();

    if (weekday === 0) {
      continue;
    }

    const weekdayLabel = weekdayFormatter.format(current);
    const capitalizedWeekday =
      weekdayLabel.charAt(0).toUpperCase() + weekdayLabel.slice(1);

    days.push(`${capitalizedWeekday} ${dayFormatter.format(current)}`);
  }

  return days;
}

export function findCategoryForService(service: string) {
  return (
    bookingCategories.find((category) => category.services.includes(service))?.name ??
    ""
  );
}
