import { GrupoApoyo, Voluntario } from "../models";
import { normalizeName, normalizeWhatsApp } from "./utils";

export const registerVoluntario = async (
  nombre: string,
  apellido: string,
  email: string,
  especialidad: string,
  telefono: string,
  whatsapp: string
): Promise<Voluntario> => {
  const response = await fetch("/api/voluntarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: normalizeName(nombre),
      apellido: normalizeName(apellido),
      email: email.trim().toLowerCase(),
      especialidad: normalizeName(especialidad),
      telefono: telefono.trim(),
      whatsapp: normalizeWhatsApp(whatsapp.trim()),
    }),
  });

  const payload = (await response.json()) as Voluntario | { message?: string };

  if (!response.ok) {
    throw new Error(
      "message" in payload && payload.message
        ? payload.message
        : "No se pudo registrar el voluntario."
    );
  }

  return payload as Voluntario;
};

