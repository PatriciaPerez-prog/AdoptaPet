"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function FormularioAdopcion() {
  const [enviado, setEnviado] = useState(false);

  const searchParams = useSearchParams();
  const mascota = searchParams.get("mascota") || "Luna";

  async function enviarSolicitud(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase
      .from("solicitudes_adopcion")
      .insert({
        nombre: String(formData.get("nombre") ?? ""),
        correo: String(formData.get("correo") ?? ""),
        telefono: String(formData.get("telefono") ?? ""),
        mascota: String(formData.get("mascota") ?? ""),
        vivienda: String(formData.get("vivienda") ?? ""),
        motivo: String(formData.get("motivo") ?? ""),
      });

    if (error) {
      console.error("ERROR SUPABASE:", JSON.stringify(error, null, 2));

      alert(
        `Error de Supabase:\nCódigo: ${error.code}\nMensaje: ${error.message}`
      );

      return;
    }

    setEnviado(true);
  }

  return (
    <main className="min-h-screen bg-blue-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">

        {/* VOLVER */}
        <a
          href="/"
          className="font-semibold text-blue-600 hover:underline"
        >
          ← Volver al inicio
        </a>

        {/* ENCABEZADO */}
        <div className="mt-8 text-center">

          <div className="text-5xl">
            🐾
          </div>

          <h1 className="mt-4 text-4xl font-bold text-gray-800">
            Solicitud de adopción
          </h1>

          <p className="mt-3 text-gray-600">
            Cuéntanos un poco sobre ti para comenzar el proceso de adopción.
          </p>

        </div>

        {/* MENSAJE DE ÉXITO */}
        {enviado && (
          <div className="mt-8 rounded-2xl bg-green-100 p-6 text-center">

            <div className="text-4xl">
              🎉
            </div>

            <h2 className="mt-2 text-xl font-bold text-green-700">
              ¡Solicitud enviada correctamente!
            </h2>

            <p className="mt-2 text-green-700">
              Gracias por querer darle un hogar a una mascota. 🐾
            </p>

            <a
              href="/"
              className="mt-5 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Volver al inicio
            </a>

          </div>
        )}

        {/* FORMULARIO */}
        {!enviado && (
          <form
            onSubmit={enviarSolicitud}
            className="mt-10 rounded-3xl bg-white p-8 shadow-lg"
          >

            {/* NOMBRE */}
            <div>
              <label
                htmlFor="nombre"
                className="font-semibold text-gray-700"
              >
                Nombre completo
              </label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Escribe tu nombre"
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* CORREO */}
            <div className="mt-6">
              <label
                htmlFor="correo"
                className="font-semibold text-gray-700"
              >
                Correo electrónico
              </label>

              <input
                id="correo"
                name="correo"
                type="email"
                placeholder="ejemplo@correo.com"
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* TELÉFONO */}
            <div className="mt-6">
              <label
                htmlFor="telefono"
                className="font-semibold text-gray-700"
              >
                Número de teléfono
              </label>

              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="0999999999"
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* MASCOTA */}
            <div className="mt-6">
              <label
                htmlFor="mascota"
                className="font-semibold text-gray-700"
              >
                ¿Qué mascota deseas adoptar?
              </label>

              <select
                id="mascota"
                name="mascota"
                defaultValue={mascota}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="Luna">
                  Luna 🐱
                </option>

                <option value="Max">
                  Max 🐶
                </option>

                <option value="Toby">
                  Toby 🐶
                </option>
              </select>
            </div>

            {/* VIVIENDA */}
            <div className="mt-6">
              <label
                htmlFor="vivienda"
                className="font-semibold text-gray-700"
              >
                Tipo de vivienda
              </label>

              <select
                id="vivienda"
                name="vivienda"
                defaultValue=""
                required
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>

                <option value="casa">
                  Casa
                </option>

                <option value="departamento">
                  Departamento
                </option>

                <option value="otra">
                  Otra
                </option>
              </select>
            </div>

            {/* MOTIVO */}
            <div className="mt-6">
              <label
                htmlFor="motivo"
                className="font-semibold text-gray-700"
              >
                ¿Por qué quieres adoptar?
              </label>

              <textarea
                id="motivo"
                name="motivo"
                rows={5}
                placeholder="Cuéntanos por qué deseas adoptar..."
                required
                className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ❤️ Enviar solicitud
            </button>

          </form>
        )}

      </div>
    </main>
  );
}

export default function AdopcionPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">
              🐾
            </div>

            <p className="text-gray-600">
              Cargando formulario de adopción...
            </p>
          </div>
        </main>
      }
    >
      <FormularioAdopcion />
    </Suspense>
  );
}