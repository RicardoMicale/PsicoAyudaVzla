import React, { useState } from 'react';
import { HorarioGuardia } from '../models';
import { CheckIcon, TrashIcon } from 'lucide-react';

interface GuardShiftInputProps {
  horarios: HorarioGuardia[];
  setHorarios: React.Dispatch<React.SetStateAction<HorarioGuardia[]>>;
  index: number;
}

export default function GuardShiftInput({ horarios, setHorarios, index }: GuardShiftInputProps) {
  const [dias, setDias] = useState<number[]>([]);
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFin, setHorarioFin] = useState("");

  const addHorario = () => {
    const newHorarios = [...horarios];
    newHorarios[index] = { dias, horarioInicio, horarioFin };
    setHorarios(newHorarios);
  }

  const removeHorario = () => {
    const newHorarios = [...horarios];
    newHorarios.splice(index, 1);
    setHorarios(newHorarios);
  }

  const diasDeLaSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Horario de guardia</label>
      <div className="grid grid-cols-7 gap-2">
        {
          diasDeLaSemana.map((d, index) => (
            <label key={index} className='flex flex-col items-center gap-2'>
              <input type="checkbox" className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-500 cursor-pointer' checked={dias.includes(index)} onChange={(e) => setDias(dias.includes(index) ? dias.filter((d) => d !== index) : [...dias, index])} />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{d.toUpperCase().charAt(0)}</span>
            </label>
          ))
        }
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="time" value={horarioInicio} onChange={(e) => setHorarioInicio(e.target.value)} className='w-full rounded-lg border border-slate-200 bg-white pl-3 pr-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white' />
        <input type="time" value={horarioFin} onChange={(e) => setHorarioFin(e.target.value)} className='w-full rounded-lg border border-slate-200 bg-white pl-3 pr-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white' />
      </div>
      <div className='flex justify-end gap-2'>
        <button className="bg-red-500 hover:bg-red-600 active:bg-red-600 text-white p-2 rounded-md flex items-center gap-2 cursor-pointer" onClick={removeHorario} type="button">
          <span className='font-bold text-white'>Eliminar horario</span>
          <TrashIcon className="h-5 w-5" />
        </button>
        <button className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-600 text-white p-2 rounded-md flex items-center gap-2 cursor-pointer" onClick={addHorario} type="button">
          <span className='font-bold text-white'>Agregar horario</span>
          <CheckIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
