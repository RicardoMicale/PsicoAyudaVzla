"use client";

import React, { createContext, startTransition, useContext, useEffect, useState } from "react";
import { getVoluntarios } from "../lib/voluntarios";
import { Voluntario, GrupoApoyo } from "../models";
import { getGrupos } from "../lib/grupos";

interface AppContextType {
  voluntarios: Voluntario[];
  grupos: GrupoApoyo[];
  isVolunteerModalOpen: boolean;
  setIsVolunteerModalOpen: (open: boolean) => void;
  refreshVoluntarios: () => Promise<void>;
  isAddGroupModalOpen: boolean;
  setIsAddGroupModalOpen: (open: boolean) => void;
  refreshGrupos: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [grupos, setGrupos] = useState<GrupoApoyo[]>([]);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);

  const refreshVoluntarios = async () => {
    try {
      const data = await getVoluntarios();
      setVoluntarios(data);
    } catch (error) {
      console.error("Error al cargar voluntarios:", error);
      setVoluntarios([]);
    }
  };

  const refreshGrupos = async () => {
    try {
      const data = await getGrupos()
      setGrupos(data)
    } catch (error) {
      console.error("Error al cargar grupos:", error);
      setGrupos([])
    }
  }

  useEffect(() => {
    void getVoluntarios()
      .then((data) => {
        startTransition(() => {
          setVoluntarios(data);
        });
      })
      .catch((error) => {
        console.error("Error al cargar voluntarios:", error);
        startTransition(() => {
          setVoluntarios([]);
        });
      });

    void getGrupos().then((data) => {
      startTransition(() => {
        setGrupos(data)
      })
    }).catch((error) => {
      console.error("Error al cargar grupos:", error);
      startTransition(() => {
        setGrupos([])
      })
    })
  }, []);

  return (
    <AppContext.Provider
      value={{
        voluntarios,
        grupos,
        isVolunteerModalOpen,
        setIsVolunteerModalOpen,
        refreshVoluntarios,
        isAddGroupModalOpen,
        setIsAddGroupModalOpen,
        refreshGrupos
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe utilizarse dentro de un AppProvider");
  }
  return context;
}
