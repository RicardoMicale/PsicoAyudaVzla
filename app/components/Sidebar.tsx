"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartHandshake, UserPlus } from "lucide-react";
import { useApp } from "./AppContext";
import { getNavigationItems } from "../routes";
import content from "../data/content.json";

export default function Sidebar() {
  const pathname = usePathname();
  const { voluntarios, grupos, setIsVolunteerModalOpen } = useApp();

  const guardiasActivas = voluntarios.filter((v) => v.guardiaActiva && v.autorizado);
  const hasActiveGuard = guardiasActivas.length > 0;

  const navigationItems = getNavigationItems(hasActiveGuard, grupos.length);

  return (
    <aside className="hidden md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 bg-slate-900 text-slate-100 border-r border-slate-800 z-30 justify-between">
      <div className="flex flex-col flex-1 overflow-y-auto pt-6 px-4">
        <Link href="/" className="flex items-center gap-3 px-2 mb-2 hover:opacity-90 transition-opacity">
          <div className="rounded-xl bg-emerald-500 p-2.5 text-slate-900 shadow-lg shadow-emerald-500/20">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white leading-tight">
              PsicoAyuda<span className="text-emerald-400">CUMIS</span>
            </h1>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Soporte Gratuito</span>
          </div>
        </Link>

        <p className="text-xs text-slate-400 px-2 mb-6 leading-relaxed">
          {content.general.slogan}
        </p>

        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.id}
                href={item.path}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left text-sm transition-all duration-200 group ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/10"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400"}`} />
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    <span className={`text-[10px] ${isActive ? "text-emerald-100" : "text-slate-500 group-hover:text-slate-400"}`}>
                      {item.description}
                    </span>
                  </div>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${
                    item.id === "guardia"
                      ? "bg-emerald-500 text-slate-900 animate-pulse"
                      : "bg-slate-700 text-slate-200"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={() => setIsVolunteerModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold py-3 text-sm transition-all hover:brightness-110 shadow-lg shadow-emerald-950/20"
        >
          <UserPlus className="h-4 w-4" />
          {content.general.volunteerButton.register}
        </button>
      </div>
    </aside>
  );
}
