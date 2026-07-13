import React from "react";
import Link from "next/link";
import { HeartHandshake, Users, ArrowRight, Sparkles } from "lucide-react";
import contentData from "./data/content.json";

export default function Page() {
  const { general } = contentData;

  return (
    <div className="space-y-8 w-full animate-fadeIn pb-8">
      {/* Welcome & Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">
        <Sparkles className="h-3 w-3" />
        Iniciativa de Apoyo Psicosocial
      </div>

      {/* Main Narrative Layout */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-3xl" />
          
          <div className="space-y-6 relative">
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200 text-justify font-normal">
              {general.textoGeneral1}
            </p>
            <div className="h-px bg-slate-100 dark:bg-slate-800" />
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200 text-justify font-normal">
              {general.textoGeneral2}
            </p>
          </div>
        </div>
      </div>

      {/* Action Modules / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {/* Module 1: Directory */}
        <Link href="/directorio" className="group block bg-white dark:bg-slate-900 border border-slate-200 hover:border-emerald-500/30 dark:border-slate-800/80 dark:hover:border-emerald-500/30 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.01] relative overflow-hidden">
          <div className="flex flex-col h-full justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Directorio de Voluntarios
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Contacta directamente a psicólogos y psiquiatras voluntarios disponibles para brindarte orientación individual sin costo.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-2">
              Buscar especialistas
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Module 2: Groups */}
        <Link href="/grupos" className="group block bg-white dark:bg-slate-900 border border-slate-200 hover:border-emerald-500/30 dark:border-slate-800/80 dark:hover:border-emerald-500/30 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.01] relative overflow-hidden">
          <div className="flex flex-col h-full justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Grupos de Apoyo Mutuo
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Únete a sesiones y círculos guiados por especialistas para compartir vivencias y fortalecer redes comunitarias.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 pt-2">
              Ver grupos activos
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
