import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";
import { GrupoApoyoModel } from "@/app/lib/models/Grupo";

const normalizeWhatsApp = (whatsapp: string) => {
  let cleanWhatsApp = whatsapp.replace(/[+\s-]/g, "");
  if (!cleanWhatsApp.startsWith("58") && cleanWhatsApp.length > 0) {
    if (cleanWhatsApp.startsWith("0")) {
      cleanWhatsApp = "58" + cleanWhatsApp.substring(1);
    } else {
      cleanWhatsApp = "58" + cleanWhatsApp;
    }
  }
  return cleanWhatsApp;
};

const normalizeName = (value: string) => value.trim().replace(/\s+/g, " ");

export async function GET() {
  try {
    await connectToDatabase();

    const grupos = await GrupoApoyoModel.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      grupos.map((grupo) => ({
        id: String(grupo._id),
        nombre: grupo.nombre,
        email: grupo.email,
        telefono: grupo.telefono,
        modalidad: grupo.modalidad,
        dia: grupo.dia,
        hora: grupo.hora,
        enlace: grupo.enlace,
        coordinador: grupo.coordinador,
        descripcion: grupo.descripcion,
        ubicacion: grupo.ubicacion,
      }))
    );
  } catch (error) {
    console.error("Error fetching grupos:", error);
    return NextResponse.json(
      { message: "No se pudieron cargar los Grupos." },
      { status: 500 }
    );
  }
}

export async function POST (request: Request) {
  try {
    const body = await request.json();

    const nombre = normalizeName(String(body.nombre ?? ""));
    const email = String(body.email ?? "").trim().toLowerCase();
    const telefono = String(body.telefono ?? "").trim();
    const modalidad = String(body.modalidad ?? "").trim();
    const dia = String(body.dia ?? "").trim();
    const hora = String(body.hora ?? "").trim();
    const enlace = String(body.enlace ?? "").trim();
    const coordinador = String(body.coordinador ?? "").trim();
    const descripcion = String(body.descripcion ?? "").trim();
    const ubicacion = String(body.ubicacion ?? "").trim();

    if (!nombre || !email || !telefono || !modalidad || !dia || !hora || !enlace || !coordinador || !descripcion || !ubicacion) {
      return NextResponse.json(
        { message: "Todos los campos del registro son obligatorios." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingGrupo = await GrupoApoyoModel.findOne({ email }).lean();
    if (existingGrupo) {
      return NextResponse.json(
        { message: "El correo electronico ya se encuentra registrado." },
        { status: 409 }
      );
    }

    const newGrupo = await GrupoApoyoModel.create({
      nombre,
      email,
      telefono,
      modalidad,
      dia,
      hora,
      enlace,
      coordinador,
      descripcion,
      ubicacion,
    });

    return NextResponse.json(
      {
        id: String(newGrupo._id),
        nombre: newGrupo.nombre,
        email: newGrupo.email,
        telefono: newGrupo.telefono,
        modalidad: newGrupo.modalidad,
        dia: newGrupo.dia,
        hora: newGrupo.hora,
        enlace: newGrupo.enlace,
        coordinador: newGrupo.coordinador,
        descripcion: newGrupo.descripcion,
        ubicacion: newGrupo.ubicacion,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating grupo:", error);
    return NextResponse.json(
      { message: "No se pudo registrar el grupo." },
      { status: 500 }
    );
  }
}
