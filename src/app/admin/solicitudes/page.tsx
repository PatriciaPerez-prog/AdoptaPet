"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Solicitud = {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  mascota: string;
  vivienda: string;
  motivo: string;
};

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  async function cargarSolicitudes() {
    setCargando(true);

    const { data, error } = await supabase
      .from("solicitudes_adopcion")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("ERROR CARGANDO SOLICITUDES:", error);
      setMensaje("No se pudieron cargar las solicitudes.");
      setCargando(false);
      return;
    }

    setSolicitudes(data || []);
    setCargando(false);
  }

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  async function eliminarSolicitud(id: string) {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta solicitud?"
    );

    if (!confirmar) {
      return;
    }

    const { error } = await supabase
      .from("solicitudes_adopcion")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("ERROR ELIMINANDO SOLICITUD:", error);
      alert("No se pudo eliminar la solicitud.");
      return;
    }

    setSolicitudes((actuales) =>
      actuales.filter((solicitud) => solicitud.id !== id)
    );

    setMensaje("Solicitud eliminada correctamente.");
  }

  return (
    <main className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="font-semibold text-blue-600 hover:underline"
        >
          ← Volver al panel
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800">
            ❤️ Solicitudes de adopción
          </h1>

          <p className="mt-2 text-gray-600">
            Consulta las solicitudes realizadas por las personas interesadas
            en adoptar.
          </p>
        </div>

        {mensaje && (
          <div className="mt-6 rounded-xl bg-green-100 p-4 text-green-700">
            {mensaje}
          </div>
        )}

        {cargando ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-md">
            <div className="text-5xl">❤️</div>
            <p className="mt-4 text-gray-600">
              Cargando solicitudes...
            </p>
          </div>
        ) : solicitudes.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-md">
            <div className="text-6xl">📭</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              No hay solicitudes
            </h2>

            <p className="mt-2 text-gray-600">
              Cuando una persona solicite una adopción, aparecerá aquí.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {solicitudes.map((solicitud) => (
              <div
                key={solicitud.id}
                className="rounded-3xl bg-white p-6 shadow-md"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {solicitud.nombre}
                    </h2>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <p className="text-gray-600">
                        📧 <strong>Correo:</strong> {solicitud.correo}
                      </p>

                      <p className="text-gray-600">
                        📱 <strong>Teléfono:</strong> {solicitud.telefono}
                      </p>

                      <p className="text-gray-600">
                        🐾 <strong>Mascota:</strong> {solicitud.mascota}
                      </p>

                      <p className="text-gray-600">
                        🏠 <strong>Vivienda:</strong> {solicitud.vivienda}
                      </p>
                    </div>

                    <div className="mt-5 rounded-2xl bg-pink-50 p-4">
                      <p className="font-semibold text-gray-700">
                        Motivo de adopción:
                      </p>

                      <p className="mt-2 text-gray-600">
                        {solicitud.motivo}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => eliminarSolicitud(solicitud.id)}
                    className="rounded-full bg-red-100 px-5 py-3 font-semibold text-red-700 hover:bg-red-200"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}