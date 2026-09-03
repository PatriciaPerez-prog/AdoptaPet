"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Mascota = {
  id: string;
  nombre: string;
  tipo: string;
  edad: string;
  ubicacion: string;
  imagen: string | null;
  descripcion: string | null;
  personalidad: string[] | null;
};

export default function AdministrarMascotas() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  async function cargarMascotas() {
    setCargando(true);

    const { data, error } = await supabase
      .from("mascotas")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) {
      console.error("ERROR CARGANDO MASCOTAS:", error);
      setMensaje("No se pudieron cargar las mascotas.");
      setCargando(false);
      return;
    }

    setMascotas(data || []);
    setCargando(false);
  }

  useEffect(() => {
    cargarMascotas();
  }, []);

  async function eliminarMascota(id: string, nombre: string) {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar a ${nombre}?`
    );

    if (!confirmar) {
      return;
    }

    const { error } = await supabase
      .from("mascotas")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("ERROR ELIMINANDO MASCOTA:", error);
      alert("No se pudo eliminar la mascota.");
      return;
    }

    setMascotas((actuales) =>
      actuales.filter((mascota) => mascota.id !== id)
    );

    setMensaje(`${nombre} fue eliminada correctamente.`);
  }

  return (
    <main className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <Link
              href="/admin"
              className="font-semibold text-blue-600 hover:underline"
            >
              ← Volver al panel
            </Link>

            <h1 className="mt-4 text-3xl font-bold text-gray-800">
              🐾 Administrar mascotas
            </h1>

            <p className="mt-2 text-gray-600">
              Consulta y administra las mascotas disponibles para adopción.
            </p>
          </div>

          <Link
            href="/admin/mascotas/nueva"
            className="rounded-full bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
          >
            + Agregar mascota
          </Link>

        </div>

        {mensaje && (
          <div className="mt-6 rounded-xl bg-green-100 p-4 text-green-700">
            {mensaje}
          </div>
        )}

        {cargando ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-md">
            <div className="text-5xl">🐾</div>
            <p className="mt-4 text-gray-600">
              Cargando mascotas...
            </p>
          </div>
        ) : mascotas.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-md">
            <div className="text-6xl">🐾</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              No hay mascotas registradas
            </h2>

            <p className="mt-2 text-gray-600">
              Puedes agregar la primera mascota desde el botón superior.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {mascotas.map((mascota) => (
              <div
                key={mascota.id}
                className="overflow-hidden rounded-3xl bg-white shadow-md"
              >

                <div className="h-56 bg-blue-100">

                  {mascota.imagen ? (
                    <img
                      src={mascota.imagen}
                      alt={mascota.nombre}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-7xl">
                      🐾
                    </div>
                  )}

                </div>

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-gray-800">
                    {mascota.nombre}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {mascota.tipo} · {mascota.edad}
                  </p>

                  <p className="mt-2 text-gray-500">
                    📍 {mascota.ubicacion}
                  </p>

                  {mascota.descripcion && (
                    <p className="mt-4 line-clamp-3 text-sm text-gray-600">
                      {mascota.descripcion}
                    </p>
                  )}

                  <div className="mt-6 flex gap-2">

                    <Link
                      href={`/mascotas/${mascota.id}`}
                      className="flex-1 rounded-full bg-gray-100 py-2 text-center font-semibold text-gray-700 hover:bg-gray-200"
                    >
                      Ver
                    </Link>

                    <Link
                      href={`/admin/mascotas/${mascota.id}/editar`}
                      className="flex-1 rounded-full bg-blue-100 py-2 text-center font-semibold text-blue-700 hover:bg-blue-200"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() =>
                        eliminarMascota(mascota.id, mascota.nombre)
                      }
                      className="flex-1 rounded-full bg-red-100 py-2 font-semibold text-red-700 hover:bg-red-200"
                    >
                      Eliminar
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}