"use client";

import React, { useState } from "react";
import { Globe, PlusIcon } from "lucide-react";
import { GrupoApoyo, Modalidad } from "../models";
import { useApp } from "./AppContext";
import GroupsFilter from "./GroupsFilter";

interface SupportGroupsProps {
  grupos: GrupoApoyo[];
}

export default function SupportGroups({ grupos }: SupportGroupsProps) {
  const { setIsAddGroupModalOpen } = useApp();
  const [grps, setGrps] = useState<GrupoApoyo[]>(grupos);

  if (grupos.length === 0) {
    return (
      <>
        <button
          className="p-3 text-white bg-emerald-600 rounded-lg flex items-center justify-center gap-2 font-bold hover:bg-emerald-700 hover:scale-105 cursor-pointer transition-all duration-200 mb-2"
          onClick={() => setIsAddGroupModalOpen(true)}
        >
          Crear grupo
          <PlusIcon className="h-4 w-4" />
        </button>
        <div className="flex flex-col items-center justify-center gap-4 animate-fadeIn">
          <h3 className="text-xl font-bold text-slate-950 dark:text-white">No hay grupos registrados</h3>
          <span className="text-slate-500 dark:text-slate-400">Haz click en el boton de aquí arriba para registrar uno.</span>
        </div>
      </>
    )
  }

  const getModalidad = (modalidad: Modalidad): string[] => {
    const mod = modalidad.toLowerCase().trim();

    switch (mod) {
      case 'presencial':
        return ['Presencial', 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900'];
      case 'online':
        return ['En linea', 'bg-sky-50 text-sky-700 border border-sky-100 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900'];
      case 'mixto':
        return ['Mixto', 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900'];
      default:
        return [modalidad || 'Desconocido', 'bg-slate-50 text-slate-700 border border-slate-100 dark:bg-slate-950/20 dark:text-slate-400 dark:border-slate-900'];
    }
  }

  const getUbicacionGrupo = (modalidad: Modalidad, lugar: string, enlace: string): string => {
    switch (modalidad) {
      case 'presencial':
        return lugar;
      case 'online':
        return enlace;
      case 'mixto':
        return `${lugar} | ${enlace}`;
      default:
        return 'Desconocido';
    }
  }

  const getContactoGrupo = (telefono: string, email: string): string => {
    if (telefono && email) {
      return `${telefono} | ${email}`;
    }
    if (telefono) {
      return telefono;
    }
    if (email) {
      return email;
    }
    return 'Desconocido';
  }

  return (
    <>
      <button
        className="p-3 text-white bg-emerald-600 rounded-lg flex items-center justify-center gap-2 font-bold hover:bg-emerald-700 hover:scale-105 cursor-pointer transition-all duration-200 mb-2"
        onClick={() => setIsAddGroupModalOpen(true)}
      >
        Crear grupo
        <PlusIcon className="h-4 w-4" />
      </button>

      <GroupsFilter grupos={grps} setGrupos={setGrps} originalGrupos={grupos} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn mt-2">
        {grps.map((grp) => (
          <div
            key={grp.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between hover:scale-[1.01] transition-transform"
          >
            <div className="space-y-4">
              {/* Modality badge */}
              <div className="flex flex-row flex-wrap flex-shrink-0 justify-between items-start md:items-center gap-4 md:gap-0">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  getModalidad(grp.modalidad)[1]
                }`}>
                  <Globe className="h-3.5 w-3.5" />
                  {getModalidad(grp.modalidad)[0]}
                </span>
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {grp.dia} - {grp.hora}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-950 dark:text-white leading-snug">
                  {grp.nombre}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {grp.descripcion}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl text-xs space-y-2 border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 font-semibold block">Facilitador:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{grp.coordinador}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Lugar / Enlace:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{getUbicacionGrupo(grp.modalidad, grp.ubicacion, grp.enlace)}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Contacto</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{getContactoGrupo(grp.telefono, grp.email)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
