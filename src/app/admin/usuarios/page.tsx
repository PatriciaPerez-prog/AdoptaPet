"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Usuario = {
  id: string;
  email: string | null;
  role: string | null;
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  async function cargarUsuarios() {
    setCargando(true);
    setMensaje("");

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, role")
      .order("role", { ascending: true });

    if (error) {
      console.error("ERROR CARGANDO USUARIOS:", error);
      setMensaje("No se pudieron cargar los usuarios.");
      setCargando(false);
      return;
    }

    setUsuarios(data || []);
    setCargando(false);
  }

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cambiarRol(id: string, nuevoRol: string) {
    const { error } = await supabase
      .from("profiles")
      .update({ role: nuevoRol })
      .eq("id", id);

    if (error) {
      console.error("ERROR CAMBIANDO ROL:", error);
      alert("No se pudo cambiar el rol.");
      return;
    }

    setUsuarios((actuales) =>
      actuales.map((usuario) =>
        usuario.id === id
          ? { ...usuario, role: nuevoRol }
          : usuario
      )
    );

    setMensaje("Rol actualizado correctamente.");
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
            👤 Administrar usuarios
          </h1>

          <p className="mt-2 text-gray-600">
            Consulta los usuarios registrados y administra sus permisos.
          </p>
        </div>

        {mensaje && (
          <div className="mt-6 rounded-xl bg-green-100 p-4 text-green-700">
            {mensaje}
          </div>
        )}

        {cargando ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-md">
            <div className="text-5xl">👤</div>
            <p className="mt-4 text-gray-600">
              Cargando usuarios...
            </p>
          </div>
        ) : usuarios.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-md">
            <div className="text-6xl">👤</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              No hay usuarios registrados
            </h2>

            <p className="mt-2 text-gray-600">
              Los usuarios registrados aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      Usuario
                    </th>

                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      ID
                    </th>

                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      Rol
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className="border-t border-gray-100"
                    >
                      <td className="px-6 py-5">
                        <span className="font-semibold text-gray-800">
                          {usuario.email || "Sin correo"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-500">
                          {usuario.id}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <select
                          value={usuario.role || "usuario"}
                          onChange={(event) =>
                            cambiarRol(
                              usuario.id,
                              event.target.value
                            )
                          }
                          className="rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 outline-none focus:border-blue-500"
                        >
                          <option value="usuario">Usuario</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}