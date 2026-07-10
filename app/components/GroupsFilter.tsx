import React, { useEffect, useState } from 'react';
import { GrupoApoyo, Modalidad } from '../models';

interface GroupsFilterProps {
  grupos: GrupoApoyo[];
  setGrupos: React.Dispatch<React.SetStateAction<GrupoApoyo[]>>;
  originalGrupos: GrupoApoyo[];
}

export default function GroupsFilter({ grupos, setGrupos, originalGrupos }: GroupsFilterProps) {
  const [fiters, setFilters] = useState<Modalidad[]>([]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    console.log(value, checked)
    if (checked) {
      setFilters([...fiters, value as Modalidad]);
    } else {
      setFilters(fiters.filter((filter) => filter !== value));
    }
  }

  useEffect(() => {
    if (fiters.length === 0) {
      setGrupos(originalGrupos);
    } else {
      setGrupos(originalGrupos.filter((grupo) => fiters.includes(grupo.modalidad)));
    }
  }, [fiters]);

  return (
    <div className="flex gap-4">
      <label htmlFor="prescencial" className="font-semibold text-slate-700 dark:text-slate-400 flex gap-1"><input type="checkbox" value={'presencial'} onChange={handleFilter} id="presencial" /><span>Presencial</span></label>
      <label htmlFor="online" className="font-semibold text-slate-700 dark:text-slate-400 flex gap-1"><input type="checkbox" value={'online'} onChange={handleFilter} id="online" /><span>En linea</span></label>
      <label htmlFor="mixto" className="font-semibold text-slate-700 dark:text-slate-400 flex gap-1"><input type="checkbox" value={'mixto'} onChange={handleFilter} id="mixto" /><span>Mixto</span></label>
    </div>
  )
}
