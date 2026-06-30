import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";
import { VoluntarioModel } from "../../lib/models/Voluntario";

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

    const voluntarios = await VoluntarioModel.find({ autorizado: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      voluntarios.map((voluntario) => ({
        id: String(voluntario._id),
        nombre: voluntario.nombre,
        apellido: voluntario.apellido ?? "",
        email: voluntario.email,
        especialidad: voluntario.especialidad,
        telefono: voluntario.telefono,
        whatsapp: voluntario.whatsapp,
        guardiaActiva: Boolean(voluntario.guardiaActiva),
        autorizado: Boolean(voluntario.autorizado),
      }))
    );
  } catch (error) {
    console.error("Error fetching voluntarios:", error);
    return NextResponse.json(
      { message: "No se pudieron cargar los voluntarios." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const nombre = normalizeName(String(body.nombre ?? ""));
    const apellido = normalizeName(String(body.apellido ?? ""));
    const email = String(body.email ?? "").trim().toLowerCase();
    const especialidad = normalizeName(String(body.especialidad ?? ""));
    const telefono = String(body.telefono ?? "").trim();
    const whatsapp = normalizeWhatsApp(String(body.whatsapp ?? "").trim());
    const horarios = (body.horarios ?? []) as { dias: number; horarioInicio: string; horarioFin: string }[];

    if (!nombre || !apellido || !email || !especialidad || !telefono || !whatsapp) {
      return NextResponse.json(
        { message: "Todos los campos del registro son obligatorios." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingVoluntario = await VoluntarioModel.findOne({ email }).lean();
    if (existingVoluntario) {
      return NextResponse.json(
        { message: "El correo electronico ya se encuentra registrado." },
        { status: 409 }
      );
    }

    const newVoluntario = await VoluntarioModel.create({
      nombre,
      apellido,
      email,
      especialidad,
      telefono,
      whatsapp,
      guardiaActiva: false,
      autorizado: true,
      horarios,
    });

    return NextResponse.json(
      {
        id: String(newVoluntario._id),
        nombre: newVoluntario.nombre,
        apellido: newVoluntario.apellido,
        email: newVoluntario.email,
        especialidad: newVoluntario.especialidad,
        telefono: newVoluntario.telefono,
        whatsapp: newVoluntario.whatsapp,
        guardiaActiva: newVoluntario.guardiaActiva,
        autorizado: newVoluntario.autorizado,
        horarios: newVoluntario.horarios,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { message: "El correo electronico ya se encuentra registrado." },
        { status: 409 }
      );
    }

    console.error("Error creating voluntario:", error);
    return NextResponse.json(
      { message: "No se pudo registrar el voluntario." },
      { status: 500 }
    );
  }
}
