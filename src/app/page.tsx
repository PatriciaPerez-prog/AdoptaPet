export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50">

      {/* ENCABEZADO */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-2">
            <span className="text-3xl">🐾</span>

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

          <button className="rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
            Iniciar sesión
          </button>

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

            <button className="rounded-full bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700">
              Adoptar ahora 🐾
            </button>

            <button className="rounded-full border-2 border-blue-600 px-7 py-3 font-semibold text-blue-600 hover:bg-blue-100">
              Conocer más
            </button>

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
                100+
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
          <div className="mt-10 grid gap-8 md:grid-cols-3">


            {/* MAX */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:shadow-xl">

              <div className="h-52 overflow-hidden bg-blue-100">

                <img
                  src="/max.JPG"
                  alt="Max"
                  className="h-full w-full object-cover"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-gray-800">
                  Max
                </h3>

                <p className="mt-1 text-gray-500">
                  Labrador · 2 años
                </p>

                <p className="mt-2 text-gray-500">
                  📍 Quito
                </p>

                <p className="mt-4 text-gray-600">
                  Max es un perro cariñoso, juguetón y muy amigable.
                </p>

                <a
  href="/mascotas/max"
  className="mt-6 block w-full rounded-full bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
>
  Ver perfil
</a>

              </div>

            </div>


            {/* LUNA */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:shadow-xl">

              <div className="h-52 overflow-hidden bg-pink-100">

                <img
                  src="/luna1.PNG"
                  alt="Luna"
                  className="h-full w-full object-cover"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-gray-800">
                  Luna
                </h3>

                <p className="mt-1 text-gray-500">
                  Gata · 1 año
                </p>

                <p className="mt-2 text-gray-500">
                  📍 Quito
                </p>

                <p className="mt-4 text-gray-600">
                  Luna es tranquila, cariñosa y disfruta mucho de los mimos.
                </p>

                <a
                  href="/mascotas/luna"
                  className="mt-6 block w-full rounded-full bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
                >
                  Ver perfil
                </a>

              </div>

            </div>


            {/* TOBY */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:shadow-xl">

              <div className="h-52 overflow-hidden bg-blue-100">

                <img
                  src="/toby1.JPEG"
                  alt="Toby"
                  className="h-full w-full object-cover"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold text-gray-800">
                  Toby
                </h3>

                <p className="mt-1 text-gray-500">
                  Mestizo · 3 años
                </p>

                <p className="mt-2 text-gray-500">
                  📍 Quito
                </p>

                <p className="mt-4 text-gray-600">
                  Toby es juguetón, obediente y busca una familia amorosa.
                </p>

                <a
  href="/mascotas/toby"
  className="mt-6 block w-full rounded-full bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
>
  Ver perfil
</a>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}


