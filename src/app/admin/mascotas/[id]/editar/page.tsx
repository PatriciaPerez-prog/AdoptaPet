"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function EditarMascotaPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [edad, setEdad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [personalidad, setPersonalidad] = useState("");

  useEffect(() => {
    async function cargarMascota() {
      const { data, error } = await supabase
        .from("mascotas")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("ERROR CARGANDO MASCOTA:", error);
        setError("No se pudo cargar la mascota.");
        setCargando(false);
        return;
      }

      if (!data) {
        setError("La mascota no existe.");
        setCargando(false);
        return;
      }

      setNombre(data.nombre || "");
      setTipo(data.tipo || "");
      setEdad(data.edad || "");
      setUbicacion(data.ubicacion || "");
      setImagen(data.imagen || "");
      setDescripcion(data.descripcion || "");
      setPersonalidad(
        Array.isArray(data.personalidad)
          ? data.personalidad.join(", ")
          : ""
      );

      setCargando(false);
    }

    cargarMascota();
  }, [id]);

  async function guardarCambios(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setGuardando(true);
    setError("");

    const { error } = await supabase
      .from("mascotas")
      .update({
        nombre,
        tipo,
        edad,
        ubicacion,
        imagen: imagen || null,
        descripcion: descripcion || null,
        personalidad: personalidad
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      })
      .eq("id", id);

    if (error) {
      console.error("ERROR ACTUALIZANDO MASCOTA:", error);
      setError(error.message);
      setGuardando(false);
      return;
    }

    router.push("/admin/mascotas");
  }

  if (cargando) {
    return (
      <main className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl">🐾</div>
          <p className="mt-4 text-gray-600">
            Cargando información...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/mascotas"
          className="font-semibold text-blue-600 hover:underline"
        >
          ← Volver a mascotas
        </Link>

        <div className="mt-6 rounded-3xl bg-white p-8 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            ✏️ Editar mascota
          </h1>

          <p className="mt-2 text-gray-600">
            Modifica la información de la mascota.
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-100 p-4 text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={guardarCambios} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Nombre
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Tipo
              </label>

              <select
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="">Selecciona un tipo</option>
                <option value="Perro">Perro 🐶</option>
                <option value="Gato">Gato 🐱</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Edad
              </label>

              <input
                type="text"
                value={edad}
                onChange={(event) => setEdad(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Ubicación
              </label>

              <input
                type="text"
                value={ubicacion}
                onChange={(event) => setUbicacion(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                URL de imagen
              </label>

              <input
                type="url"
                value={imagen}
                onChange={(event) => setImagen(event.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Descripción
              </label>

              <textarea
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
                rows={4}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Personalidad
              </label>

              <input
                type="text"
                value={personalidad}
                onChange={(event) => setPersonalidad(event.target.value)}
                placeholder="Ej. Cariñosa, juguetona, tranquila"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <p className="mt-1 text-sm text-gray-500">
                Separa las características con comas.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Link
                href="/admin/mascotas"
                className="flex-1 rounded-full bg-gray-100 py-3 text-center font-semibold text-gray-700 hover:bg-gray-200"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={guardando}
                className="flex-1 rounded-full bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {guardando ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}