import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export interface HorarioGuardia {
  dias: number[];
  horarioInicio: string;
  horarioFin: string;
}

export interface Voluntario {
  id: string;
  nombre: string;
  email: string;
  especialidad: string;
  telefono: string;
  whatsapp: string;
  guardiaActiva: boolean;
  autorizado: boolean;
  horarios: HorarioGuardia[];
}

export interface GrupoApoyo {
  id: string;
  nombre: string;
  descripcion: string;
  modalidad: "online" | "presencial" | 'mixto';
  enlace: string;
  dia: string;
  hora: string;
  coordinador: string;
  ubicacion: string;
  telefono: string;
  email: string;
}

export type Modalidad = 'presencial' | 'online' | 'mixto';

export type SectionType =
  | "guardia"
  | "directorio"
  | "grupos"
  | "diagnostico"
  | "reacciones"
  | "alertas"
  | "duelo"
  | "habitos";

export interface NavigationItem {
  id: SectionType;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  description: string;
  badge?: string | null;
  alert?: boolean;
}
