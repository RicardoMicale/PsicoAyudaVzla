import { Voluntario } from "../models";

export const getVoluntarios = async (): Promise<Voluntario[]> => {
  const response = await fetch("/api/voluntarios", {
    method: "GET",
    cache: "no-store",
  });

  const payload = (await response.json()) as Voluntario[] | { message?: string };

  if (!response.ok) {
    throw new Error(
      "message" in payload && payload.message
        ? payload.message
        : "No se pudieron cargar los voluntarios."
    );
  }

  return payload as Voluntario[];
};
