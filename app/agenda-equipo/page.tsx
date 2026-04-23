import type { Metadata } from "next";
import { StaffPortal } from "@/components/staff/StaffPortal";

export const metadata: Metadata = {
  title: "Agenda interna | Karina Studio +",
  description:
    "Portal demo para trabajadoras y secretaria con la agenda semanal del equipo.",
};

export default function TeamSchedulePage() {
  return <StaffPortal />;
}
