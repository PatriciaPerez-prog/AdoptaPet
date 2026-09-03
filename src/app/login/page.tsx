"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function iniciarSesion(e: React.FormEvent) {
    e.preventDefault();

    setCargando(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("ERROR DE LOGIN:", error);
      setError("Correo o contraseña incorrectos.");
      setCargando(false);
      return;
    }

    if (!data.user) {
      setError("No se pudo iniciar sesión.");
      setCargando(false);
      return;
    }

    // Buscar el perfil y el rol del usuario
    const { data: perfil, error: errorPerfil } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (errorPerfil) {
      console.error("ERROR OBTENIENDO PERFIL:", errorPerfil);

      await supabase.auth.signOut();

      setError(
        "No se encontró el perfil del usuario. Verifica la tabla profiles."
      );

      setCargando(false);
      return;
    }

    console.log("USUARIO:", data.user.email);
    console.log("ROL:", perfil?.role);

    // Administrador
    if (perfil?.role === "admin") {
      router.replace("/admin");
    } else {
      // Usuario normal
      router.replace("/");
    }

    setCargando(false);
  }

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          {/* LOGO */}
          <div className="text-center">

            <div className="text-6xl">
              🐾
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-800">
              AdoptaPet
            </h1>

            <p className="mt-2 text-gray-500">
              Encuentra un amigo para toda la vida ❤️
            </p>

          </div>

          {/* TÍTULO */}
          <div className="mt-8">

            <h2 className="text-2xl font-bold text-gray-800">
              Iniciar sesión
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Ingresa a tu cuenta para continuar
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* FORMULARIO */}
          <form onSubmit={iniciarSesion} className="mt-6 space-y-5">

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cargando ? "Ingresando..." : "Iniciar sesión"}
            </button>

          </form>

          {/* REGISTRO */}
          <div className="mt-6 text-center text-sm text-gray-500">

            ¿No tienes una cuenta?{" "}

            <button
              type="button"
              onClick={() => router.push("/registro")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Regístrate aquí
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}
