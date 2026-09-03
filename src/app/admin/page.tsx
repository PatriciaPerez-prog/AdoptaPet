"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    async function comprobarAdministrador() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: perfil, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || !perfil || perfil.role !== "admin") {
        router.replace("/");
        return;
      }

      setUsuario(user);
      setCargando(false);
    }

    comprobarAdministrador();
  }, [router]);

  async function cerrarSesion() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (cargando) {
    return (
      <main className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🐾</div>
          <p className="text-gray-600">Verificando permisos...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              🐾 AdoptaPet
            </h1>

            <p className="text-sm text-gray-500">
              Panel de administración
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-gray-600">
              👑 Administrador
            </span>

            <button
              onClick={cerrarSesion}
              className="rounded-full bg-red-500 px-5 py-2 text-white hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Bienvenido al panel de administración
          </h2>

          <p className="mt-2 text-gray-600">
            Desde aquí podrás administrar las mascotas y las solicitudes de
            adopción.
          </p>

          {usuario?.email && (
            <p className="mt-2 text-sm text-gray-500">
              Sesión iniciada como: {usuario.email}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          
          {/* MASCOTAS */}
          <div className="rounded-3xl bg-white p-7 shadow-md">
            <div className="text-4xl">🐶</div>

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              Mascotas
            </h3>

            <p className="mt-2 text-gray-600">
              Agregar, consultar, modificar y eliminar mascotas.
            </p>

            <button
              onClick={() => router.push("/admin/mascotas")}
              className="mt-6 w-full rounded-full bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Administrar mascotas
            </button>
          </div>

          {/* ADOPCIONES */}
          <div className="rounded-3xl bg-white p-7 shadow-md">
            <div className="text-4xl">❤️</div>

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              Adopciones
            </h3>

            <p className="mt-2 text-gray-600">
              Consultar y gestionar las solicitudes de adopción.
            </p>

            <button
              onClick={() => router.push("/admin/solicitudes")}
              className="mt-6 w-full rounded-full bg-pink-500 py-3 font-semibold text-white hover:bg-pink-600"
            >
              Ver solicitudes
            </button>
          </div>

          {/* USUARIOS */}
          <div className="rounded-3xl bg-white p-7 shadow-md">
            <div className="text-4xl">👤</div>

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              Usuarios
            </h3>

            <p className="mt-2 text-gray-600">
              Sistema de usuarios con diferentes permisos.
            </p>

            <button
              onClick={() => router.push("/admin/usuarios")}
              className="mt-6 w-full rounded-full bg-gray-800 py-3 font-semibold text-white hover:bg-gray-900"
            >
              Administrar usuarios
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}