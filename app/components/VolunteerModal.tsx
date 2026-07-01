"use client";

import React, { useState } from "react";
import { Check, Activity, HeartHandshake, Mail, Phone, Shield, User, X } from "lucide-react";
import { registerVoluntario } from "../lib/auth";
import { useApp } from "./AppContext";
import GuardSettingsForm from "./GuardSettingsForm";
import { HorarioGuardia } from "../models";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}
//  TODO: Agregar checkbox guardia Si/No
//  TODO: Agregar en caso de guardia Si -> dia y horas de guardia/todos los dias/toda hora ciertos dias
export default function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const { refreshVoluntarios } = useApp();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [disponibleGuardia, setDisponibleGuardia] = useState(false);
  const [horarioGuardia, setHorarioGuardia] = useState<HorarioGuardia[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setEspecialidad("");
    setTelefono("");
    setWhatsapp("");
    setHorarioGuardia([]);
    setDisponibleGuardia(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!nombre || !apellido || !email || !especialidad || !telefono || !whatsapp) {
      setError("Por favor, completa todos los campos del registro.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await registerVoluntario(nombre, apellido, email, especialidad, telefono, whatsapp, horarioGuardia);
      await refreshVoluntarios();
      setSuccess("Registro completado con exito. Ya quedo guardada la informacion del voluntario.");
      resetForm();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-8 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/10 p-2">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Registro de Voluntario</h2>
          </div>
          <p className="mt-2 text-emerald-50/90 text-sm">
            Completa tus datos para dejarte registrado. Por ahora no usaremos inicio de sesion; mas adelante conectamos esto con la base de datos.
          </p>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:border-red-900 dark:text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-400 flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0" />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Maria"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Apellido
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Perez"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Correo personal
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Especialidad
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                  placeholder="Psicologia clinica, duelo, ansiedad..."
                  className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Telefono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="0412 123 4567"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  WhatsApp
                </label>
                <div className="relative">
                  <Activity className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="58412 1234567"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <GuardSettingsForm
              disponibleGuardia={disponibleGuardia}
              setDisponibleGuardia={setDisponibleGuardia}
              horarioGuardia={horarioGuardia}
              setHorarioGuardia={setHorarioGuardia}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 py-3 font-semibold text-white hover:from-emerald-700 hover:to-teal-800 focus:outline-none disabled:opacity-50 transition-all shadow-md shadow-emerald-500/10"
            >
              {loading ? "Guardando registro..." : "Registrar voluntario"}
            </button>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
              No necesitas iniciar sesion. Este formulario solo guarda tu registro para la lista de voluntarios.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
