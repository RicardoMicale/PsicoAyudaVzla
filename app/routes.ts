import {
  Activity, Users, HeartHandshake, Brain,
  AlertTriangle, Heart, Sparkles, Home
} from "lucide-react";
import { NavigationItem } from "./models";

export interface RouteItem extends Omit<NavigationItem, "icon"> {
  path: string;
  icon: NavigationItem["icon"];
}

export const getNavigationItems = (hasActiveGuard: boolean, groupCount: number): RouteItem[] => [
  {
    id: "inicio",
    path: "/",
    label: "Inicio",
    icon: Home,
    description: "Bienvenida y presentación"
  },
  {
    id: "directorio",
    path: "/directorio",
    label: "Directorio de Voluntarios",
    icon: Users,
    description: "Buscador de especialistas"
  },
  {
    id: "grupos",
    path: "/grupos",
    label: "Grupos de Apoyo Mutuo",
    icon: HeartHandshake,
    description: "Comunidades guiadas",
    badge: groupCount > 0 ? `${groupCount}` : null
  },
  {
    id: "reacciones",
    path: "/reacciones",
    label: "Reacciones Post-Sismo",
    icon: Brain,
    description: "Guía de adaptación emocional"
  },
  {
    id: "alertas",
    path: "/alertas",
    label: "Señales de Alerta Crítica",
    icon: AlertTriangle,
    description: "Protocolo de acción de emergencia",
  },
  {
    id: "duelo",
    path: "/duelo",
    label: "Manifestaciones de Duelo",
    icon: Heart,
    description: "Dimensiones del dolor emocional"
  },
  {
    id: "habitos",
    path: "/habitos",
    label: "Hábitos Psicobiológicos",
    icon: Sparkles,
    description: "Estabilidad y autocuidado"
  },
];
