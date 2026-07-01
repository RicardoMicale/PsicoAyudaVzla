import { Schema, model, models } from "mongoose";

export const horarioGuardiaSchema = new Schema({
  dias: { type: [Number], required: [true, 'Es necesario indicar el dia de la semana para la guardia'], trim: true},
  horarioInicio: { type: String, required: [true, 'Es necesario indicar el horario de inicio de la guardia'], trim: true },
  horarioFin: { type: String, required: [true, 'Es necesario indicar el horario de fin de la guardia'], trim: true },
}, {
  timestamps: true,
  versionKey: false,
  _id: false
})

export const HorarioGuardiaModel = models.HorarioGuardia || model('HorarioGuardia', horarioGuardiaSchema, 'horario_guardias');
