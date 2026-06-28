"use client";

import React, { createContext, startTransition, useContext, useEffect, useState } from "react";
import { getVoluntarios } from "../lib/voluntarios";
import { subscribeToGrupos } from "../lib/grupos";
import { Voluntario, GrupoApoyo } from "../models";

interface AppContextType {
  voluntarios: Voluntario[];
  grupos: GrupoApoyo[];
  isVolunteerModalOpen: boolean;
  setIsVolunteerModalOpen: (open: boolean) => void;
  refreshVoluntarios: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [grupos, setGrupos] = useState<GrupoApoyo[]>([]);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  const refreshVoluntarios = async () => {
    try {
      const data = await getVoluntarios();
      setVoluntarios(data);
    } catch (error) {
      console.error("Error al cargar voluntarios:", error);
      setVoluntarios([]);
    }
  };

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

    const unsubGrupos = subscribeToGrupos((data) => {
      setGrupos(data);
    });

    return () => {
      unsubGrupos();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        voluntarios,
        grupos,
        isVolunteerModalOpen,
        setIsVolunteerModalOpen,
        refreshVoluntarios,
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
