"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function NuevaMascotaPage() {
  const router = useRouter();

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  async function guardarMascota(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setGuardando(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const nuevaMascota = {
      nombre: String(formData.get("nombre") ?? ""),
      tipo: String(formData.get("tipo") ?? ""),
      edad: String(formData.get("edad") ?? ""),
      ubicacion: String(formData.get("ubicacion") ?? ""),
      imagen: String(formData.get("imagen") ?? "") || null,
      descripcion: String(formData.get("descripcion") ?? "") || null,
      personalidad: String(formData.get("personalidad") ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const { error } = await supabase
      .from("mascotas")
      .insert(nuevaMascota);

    if (error) {
      console.error("ERROR CREANDO MASCOTA:", error);
      setError(error.message);
      setGuardando(false);
      return;
    }

    router.push("/admin/mascotas");
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
            🐾 Agregar nueva mascota
          </h1>

          <p className="mt-2 text-gray-600">
            Completa la información de la mascota para registrarla.
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-100 p-4 text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={guardarMascota} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Nombre
              </label>

              <input
                type="text"
                name="nombre"
                required
                placeholder="Ej. Luna"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Tipo
              </label>

              <select
                name="tipo"
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
                name="edad"
                required
                placeholder="Ej. 2 años"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Ubicación
              </label>

              <input
                type="text"
                name="ubicacion"
                required
                placeholder="Ej. Quito"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                URL de imagen
              </label>

              <input
                type="url"
                name="imagen"
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Descripción
              </label>

              <textarea
                name="descripcion"
                rows={4}
                placeholder="Cuéntanos un poco sobre la mascota..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Personalidad
              </label>

              <input
                type="text"
                name="personalidad"
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
                {guardando ? "Guardando..." : "Guardar mascota"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}