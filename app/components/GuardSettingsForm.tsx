import React from 'react';
import { HorarioGuardia } from '../models';
import GuardShiftInput from './GuardShiftInput';
import { PlusIcon } from 'lucide-react';

interface GuardSettingsFormProps {
  disponibleGuardia: boolean;
  setDisponibleGuardia: React.Dispatch<React.SetStateAction<boolean>>;
  horarioGuardia: HorarioGuardia[];
  setHorarioGuardia: React.Dispatch<React.SetStateAction<HorarioGuardia[]>>;
}

export default function GuardSettingsForm({
  disponibleGuardia,
  setDisponibleGuardia,
  horarioGuardia,
  setHorarioGuardia
}: GuardSettingsFormProps) {
  const resetValues = () => {
    setDisponibleGuardia(false);
    setHorarioGuardia([]);
  }

  const addDay = () => {
    setHorarioGuardia([...horarioGuardia, { dias: [], horarioInicio: "", horarioFin: "" }]);
  }

  return (
    <div>
      <label className='flex gap-2'>
        <input
          type="checkbox"
          checked={disponibleGuardia}
          onChange={(e) => {
            const nuevoValor = !disponibleGuardia;
            setDisponibleGuardia(nuevoValor);
            // Si se desactiva (nuevoValor = false), resetea los otros valores
            if (!nuevoValor) resetValues();
          }} />
        <span className='font-semibold text-slate-700 dark:text-slate-300'>
          Puedo hacer guardia?
        </span>
      </label>

      {disponibleGuardia && (
        <div className="grid grid-cols-1 gap-4 mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          {
            horarioGuardia.map((_, index) => (
              <GuardShiftInput key={index} horarios={horarioGuardia} setHorarios={setHorarioGuardia} index={index} />
            ))
          }
          <button className='mt-2 rounded-lg bg-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-2' onClick={addDay} type="button">
            <PlusIcon className="h-4 w-4" />
            <span>Agregar horario</span>
          </button>
        </div>
      )}

    </div>
  )
}
