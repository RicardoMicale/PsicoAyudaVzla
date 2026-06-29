import { GrupoApoyo } from "../models";
import { normalizeName } from "./utils";

export const getGrupos = async () => {
  const response = await fetch("/api/grupos", {
    method: "GET",
    cache: "no-store",
  });

  const payload = (await response.json()) as GrupoApoyo[] | { message?: string };

  if (!response.ok) {
    throw new Error(
      "message" in payload && payload.message
        ? payload.message
        : "No se pudieron cargar los voluntarios."
    );
  }

  return payload as GrupoApoyo[];
}


export const registerGrupoApoyo = async (
  nombre: string,
  telefono: string,
  modalidad: string,
  email: string,
  dia: string,
  hora: string,
  descripcion: string,
  enlace: string = "",
  coordinador: string = "",
  ubicacion: string = ""
): Promise<GrupoApoyo> => {
  const response = await fetch("/api/grupos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: normalizeName(nombre),
      telefono: telefono.trim(),
      modalidad: normalizeName(modalidad),
      email: email.trim().toLowerCase(),
      dia: normalizeName(dia),
      hora: normalizeName(hora),
      descripcion: normalizeName(descripcion),
      enlace: normalizeName(enlace),
      coordinador: normalizeName(coordinador),
      ubicacion: normalizeName(ubicacion)
    }),
  });

  const payload = (await response.json()) as GrupoApoyo | { message?: string };

  if (!response.ok) {
    throw new Error(
      "message" in payload && payload.message
        ? payload.message
        : "No se pudo registrar el grupo de apoyo."
    );
  }

  return payload as GrupoApoyo;
}
