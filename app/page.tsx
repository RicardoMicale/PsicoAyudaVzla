"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "./components/AppContext";
import ActiveGuards from "./components/ActiveGuards";

export default function Page() {
  const router = useRouter();
  const { voluntarios, refreshVoluntarios } = useApp();

  const [tick, setTick] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => {
      refreshVoluntarios();
      setTick(Date.now());
    }, 1800000); // 30 minutos
    return () => clearInterval(t);
  }, []);

  return (
    <ActiveGuards
      vols={voluntarios.filter((v) => v.guardiaActiva)}
      onNavigateToDirectory={() => router.push("/directorio")}
      onNavigateToDiagnostic={() => router.push("/diagnostico")}
    />
  );
}
