"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, Home } from "lucide-react";

interface BottomNavProps {
  onMoreClick: () => void;
}

export default function BottomNav({ onMoreClick }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-slate-300 border-t border-slate-800 z-40">
      <div className="grid grid-cols-3 items-center h-16">

        <Link
          href="/"
          className={`flex flex-col items-center justify-center h-full transition-all ${
            pathname === "/" ? "text-emerald-400 font-bold" : "text-slate-400"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[9px] mt-1 tracking-tight">Inicio</span>
        </Link>

        <Link
          href="/directorio"
          className={`flex flex-col items-center justify-center h-full transition-all ${
            pathname === "/directorio" ? "text-emerald-400 font-bold" : "text-slate-400"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-[9px] mt-1 tracking-tight">Directorio</span>
        </Link>

        <button
          onClick={onMoreClick}
          className="flex flex-col items-center justify-center h-full text-slate-400"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[9px] mt-1 tracking-tight">Más</span>
        </button>

      </div>
    </div>
  );
}
