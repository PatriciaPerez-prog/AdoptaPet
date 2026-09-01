"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
    const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function iniciarSesion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensaje("");

    const { error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: password,
    });

    if (error) {
  console.error("ERROR LOGIN:", error);
  setMensaje(`Error: ${error.message}`);
  return;
}

router.push("/");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐾</div>

          <h1 className="text-3xl font-bold text-gray-800">
            Iniciar sesión
          </h1>

          <p className="text-gray-500 mt-2">
            Bienvenido a AdoptaPet
          </p>
        </div>

        <form onSubmit={iniciarSesion} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 transition"
          >
            Iniciar sesión
          </button>
        </form>

        {mensaje && (
          <p className="mt-5 text-center text-sm font-medium text-gray-700">
            {mensaje}
          </p>
        )}

        <div className="text-center mt-6">
          <a
            href="/registro"
            className="text-blue-500 hover:underline"
          >
            ¿No tienes una cuenta? Regístrate
          </a>
        </div>
      </div>
    </main>
  );
}