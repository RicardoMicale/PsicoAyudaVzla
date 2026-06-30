import { HorarioGuardia } from "../models";

export const normalizeWhatsApp = (whatsapp: string) => {
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

export const normalizeName = (value: string) => value.trim().replace(/\s+/g, " ");

export const getIsActiveGuard = (timeSlots: HorarioGuardia[]): boolean => {
  if (!timeSlots) return false;

  const now = new Date();

  const today = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const currentTime = now.toTimeString().slice(0, 5);

  return timeSlots.some((slot) => {
    if (!slot.dias.includes(today)) return false

    const isAfterStart = currentTime >= slot.horarioInicio;
    const isBeforeEnd = currentTime <= slot.horarioFin;

    return isAfterStart && isBeforeEnd
  });
}
