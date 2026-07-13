"use client";

import React from "react";
import { HeartHandshake, UserPlus } from "lucide-react";
import { useApp } from "./AppContext";
import content from "../data/content.json";

export default function Header() {
  const { setIsVolunteerModalOpen } = useApp();

  return (
    <header className="md:hidden bg-slate-900 text-white px-4 py-4 border-b border-slate-800 flex items-center justify-between sticky top-[44px] z-30">
      <div className="flex items-center gap-2">
        <HeartHandshake className="h-5 w-5 text-emerald-400" />
        <span className="font-extrabold tracking-tight text-base">PsicoAyudaCUMIS</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsVolunteerModalOpen(true)}
          className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg px-2.5 py-1.5 transition-all"
        >
          <UserPlus className="h-3.5 w-3.5" />
          {content.general.volunteerButton.register}
        </button>
      </div>
    </header>
  );
}
