"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

export default function Home() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [cargandoMascotas, setCargandoMascotas] = useState(true);

  useEffect(() => {
    let activo = true;

    async function obtenerSesion() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!activo) return;

        if (!session?.user) {
          setUsuario(null);
          setCargando(false);
          router.replace("/login");
          return;
        }

        setUsuario(session.user);
        setCargando(false);

        // Obtener mascotas desde Supabase
        const { data, error } = await supabase
          .from("mascotas")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("ERROR OBTENIENDO MASCOTAS:", error);
          setMascotas([]);
        } else {
          setMascotas(data || []);
        }

        setCargandoMascotas(false);
      } catch (error) {
        console.error("ERROR OBTENIENDO SESIÓN:", error);
        setUsuario(null);
        setCargando(false);
        setCargandoMascotas(false);
        router.replace("/login");
      }
    }

    obtenerSesion();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!activo) return;

        if (session?.user) {
          setUsuario(session.user);
          setCargando(false);
        } else {
          setUsuario(null);
          setCargando(false);
          router.replace("/login");
        }
      }
    );

    return () => {
      activo = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (cargando) {
    return (
      <main className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🐾</div>

          <p className="text-gray-600">
            Cargando AdoptaPet...
          </p>
        </div>
      </main>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <main className="min-h-screen bg-blue-50">

      {/* ENCABEZADO */}
      <header className="bg-white shadow-sm">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-2">

            <span className="text-3xl">
              🐾
            </span>

            <h1 className="text-2xl font-bold text-blue-600">
              AdoptaPet
            </h1>

          </div>

          <nav className="hidden items-center gap-8 md:flex">

            <a
              href="#inicio"
              className="text-gray-700 hover:text-blue-600"
            >
              Inicio
            </a>

            <a
              href="#mascotas"
              className="text-gray-700 hover:text-blue-600"
            >
              Mascotas
            </a>

            <a
              href="#nosotros"
              className="text-gray-700 hover:text-blue-600"
            >
              Nosotros
            </a>

            <a
              href="#contacto"
              className="text-gray-700 hover:text-blue-600"
            >
              Contacto
            </a>

          </nav>

          <div className="flex items-center gap-3">

            <span className="hidden text-sm font-medium text-gray-700 sm:block">
              👤 {usuario.email}
            </span>

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setUsuario(null);
                router.replace("/login");
              }}
              className="rounded-full bg-red-500 px-5 py-2 text-white hover:bg-red-600"
            >
              Cerrar sesión
            </button>

          </div>

        </div>

      </header>

      {/* PRESENTACIÓN */}
      <section
        id="inicio"
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2"
      >

        <div>

          <p className="mb-3 text-lg font-semibold text-blue-600">
            🐶🐱 Encuentra a tu nuevo mejor amigo
          </p>

          <h2 className="text-5xl font-bold leading-tight text-gray-800">
            Dale un hogar a una mascota que necesita amor
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            En AdoptaPet conectamos a personas que desean adoptar
            con mascotas que buscan una familia. Explora nuestros
            animales disponibles y encuentra el compañero ideal para ti.
          </p>

          <div className="mt-8 flex gap-4">

            <a
              href="#mascotas"
              className="rounded-full bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Adoptar ahora 🐾
            </a>

            <a
              href="#nosotros"
              className="rounded-full border-2 border-blue-600 px-7 py-3 font-semibold text-blue-600 hover:bg-blue-100"
            >
              Conocer más
            </a>

          </div>

        </div>

        {/* TARJETA DE BIENVENIDA */}
        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

          <div className="mb-6 text-8xl">
            🐶
          </div>

          <h3 className="text-3xl font-bold text-gray-800">
            Una mascota cambia tu vida
          </h3>

          <p className="mt-4 text-gray-600">
            Y tú puedes cambiar la suya.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">

            <div className="rounded-2xl bg-blue-50 p-4">

              <p className="text-2xl font-bold text-blue-600">
                {mascotas.length}+
              </p>

              <p className="text-sm text-gray-600">
                Mascotas
              </p>

            </div>

            <div className="rounded-2xl bg-blue-50 p-4">

              <p className="text-2xl font-bold text-blue-600">
                80+
              </p>

              <p className="text-sm text-gray-600">
                Adopciones
              </p>

            </div>

            <div className="rounded-2xl bg-blue-50 p-4">

              <p className="text-2xl font-bold text-blue-600">
                24/7
              </p>

              <p className="text-sm text-gray-600">
                Ayuda
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* MASCOTAS */}
      <section
        id="mascotas"
        className="bg-blue-50 py-16"
      >

        <div className="mx-auto max-w-6xl px-6">

          <div className="text-center">

            <p className="font-semibold text-blue-600">
              🐾 Encuentra a tu compañero
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              Mascotas disponibles para adopción
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Conoce algunas de las mascotas que están esperando
              encontrar una familia que les dé mucho amor.
            </p>

          </div>

          {/* TARJETAS */}
          {cargandoMascotas ? (

            <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-md">

              <div className="text-5xl">
                🐾
              </div>

              <p className="mt-4 text-gray-600">
                Cargando mascotas...
              </p>

            </div>

          ) : mascotas.length === 0 ? (

            <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-md">

              <div className="text-5xl">
                🐾
              </div>

              <p className="mt-4 text-lg font-semibold text-gray-700">
                No hay mascotas disponibles actualmente.
              </p>

            </div>

          ) : (

            <div className="mt-10 grid gap-8 md:grid-cols-3">

              {mascotas.map((mascota) => (

                <div
                  key={mascota.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:shadow-xl"
                >

                  {/* IMAGEN */}
                  <div className="h-52 overflow-hidden bg-blue-100">

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

                  {/* INFORMACIÓN */}
                  <div className="p-6">

                    <h3 className="text-2xl font-bold text-gray-800">
                      {mascota.nombre}
                    </h3>

                    <p className="mt-1 text-gray-500">
                      {mascota.tipo} · {mascota.edad}
                    </p>

                    <p className="mt-2 text-gray-500">
                      📍 {mascota.ubicacion}
                    </p>

                    <p className="mt-4 text-gray-600">
                      {mascota.descripcion ||
                        "Esta mascota está esperando encontrar un hogar lleno de amor."}
                    </p>

                    <a
                      href={`/mascotas/${mascota.id}`}
                      className="mt-6 block w-full rounded-full bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
                    >
                      Ver perfil
                    </a>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

      {/* NOSOTROS */}
      <section
        id="nosotros"
        className="bg-white py-16"
      >

        <div className="mx-auto max-w-4xl px-6 text-center">

          <p className="font-semibold text-blue-600">
            ❤️ Sobre nosotros
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            Ayudamos a conectar corazones
          </h2>

          <p className="mt-5 leading-relaxed text-gray-600">
            AdoptaPet es una plataforma creada para facilitar el
            proceso de adopción responsable de mascotas y ayudar a
            que cada animal encuentre una familia que pueda darle
            cariño, cuidado y un hogar seguro.
          </p>

        </div>

      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="bg-blue-600 py-12 text-white"
      >

        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-2xl font-bold">
            ¿Quieres adoptar?
          </h2>

          <p className="mt-3">
            Revisa nuestras mascotas disponibles y comienza tu
            proceso de adopción.
          </p>

          <p className="mt-6 text-sm">
            📍 Quito, Ecuador
          </p>

        </div>

      </section>

    </main>
  );
}

