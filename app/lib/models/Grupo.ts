import { Schema, model, models } from "mongoose";

const grupoApoyoSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    modalidad: { type: String, required: true, trim: true },
    dia: { type: String, required: true, trim: true },
    hora: { type: String, required: true, trim: true },
    enlace: { type: String, required: true, trim: true },
    coordinador: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    ubicacion: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const GrupoApoyoModel = models.GrupoApoyo || model("GrupoApoyo", grupoApoyoSchema, "grupos");
