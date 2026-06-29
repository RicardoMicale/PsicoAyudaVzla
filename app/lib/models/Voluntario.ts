import { Schema, model, models } from "mongoose";

const voluntarioSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    especialidad: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    guardiaActiva: { type: Boolean, default: false },
    autorizado: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const VoluntarioModel =
  models.Voluntario || model("Voluntario", voluntarioSchema, "voluntarios");
