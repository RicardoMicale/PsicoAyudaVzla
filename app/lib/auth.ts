import { Voluntario } from "../models";

const normalizeWhatsApp = (whatsapp: string) => {
  let cleanWhatsApp = whatsapp.replace(/[+\s-]/g, "");
  if (!cleanWhatsApp.startsWith("58") && cleanWhatsApp.length > 0) {
    if (cleanWhatsApp.startsWith("0")) {
      cleanWhatsApp = "58" + cleanWhatsApp.substring(1);
    } else {
      cleanWhatsApp = "58" + cleanWhatsApp;
    }
  }
  return cleanWhatsApp;
};

const normalizeName = (value: string) => value.trim().replace(/\s+/g, " ");

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
