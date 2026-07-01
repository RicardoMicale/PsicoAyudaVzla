import { Calendar, Check, Clock, GroupIcon, LinkIcon, MailIcon, Phone, Pin, TagsIcon, TextIcon, User, XIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { registerGrupoApoyo } from '../lib/grupos';
import { useApp } from './AppContext';

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddGroupModal({ isOpen, onClose }: AddGroupModalProps) {
  const { refreshGrupos } = useApp()
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [enlace, setEnlace] = useState("");
  const [coordinador, setCoordinador] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const resetValues = () => {
    setNombre("");
    setEmail("");
    setTelefono("");
    setModalidad("");
    setDia("");
    setHora("");
    setEnlace("");
    setCoordinador("");
    setDescripcion("");
    setUbicacion("");
    setError(null);
    setSuccess(null);
    setLoading(false);
  }

  const closeModal = () => {
    resetValues();
    onClose();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!nombre || !descripcion || !telefono || !modalidad || !dia || !hora || !enlace || !coordinador || !ubicacion) {
      setError("Por favor, completa todos los campos del registro.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await registerGrupoApoyo(
        nombre,
        telefono,
        modalidad,
        email,
        dia,
        hora,
        descripcion,
        enlace,
        coordinador,
        ubicacion,
      );
      setSuccess("Grupo de apoyo registrado exitosamente.");
      await refreshGrupos()
      closeModal()
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-4">
        <div className="flex items-center justify-between px-4">
          <span className="font-bold text-xl text-white">Agregar grupo de apoyo</span>
          <button
            onClick={closeModal}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <XIcon className="h-5 w-5 text-white" />
          </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nombre
                </label>
                <div className="relative">
                  <GroupIcon className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ayuda de ansiedad"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Descripción
                </label>
                <div className="relative">
                  <TextIcon className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción del grupo"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="04141234567"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Correo electrónico
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@email.com"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Coordinador
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={coordinador}
                    onChange={(e) => setCoordinador(e.target.value)}
                    placeholder="Juan Perez"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Ubicación
                </label>
                <div className="relative">
                  <Pin className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    placeholder="Casa del Grupo de Apoyo"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Enlace
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={enlace}
                    onChange={(e) => setEnlace(e.target.value)}
                    placeholder="https://t.me/grupodeapoyo"
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Día
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      value={dia}
                      onChange={(e) => setDia(e.target.value)}
                      placeholder="Lunes"
                      className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Hora
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      placeholder="19:00"
                      className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Modalidad
                </label>
                <div className="relative">
                  <TagsIcon className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <select
                    value="desconocida"
                    onChange={(e) => setModalidad(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    required
                  >
                    <option value="desconocida">Selecciona una modalidad</option>
                    <option value="presencial">Presencial</option>
                    <option value="online">Online</option>
                    <option value="mixto">Mixto</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 py-3 font-semibold text-white hover:from-emerald-700 hover:to-teal-800 focus:outline-none disabled:opacity-50 transition-all shadow-md shadow-emerald-500/10"
            >
              {loading ? "Guardando registro..." : "Registrar grupo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
