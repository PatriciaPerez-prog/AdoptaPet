
export default function LunaPage() {
  return (
    <main className="min-h-screen bg-blue-50 px-6 py-12">

      <div className="mx-auto max-w-4xl">

        {/* VOLVER */}
        <a
          href="/#mascotas"
          className="font-semibold text-blue-600 hover:underline"
        >
          ← Volver a mascotas
        </a>

        {/* TARJETA */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">

          <div className="grid md:grid-cols-2">

            {/* FOTO DE LUNA */}
            <div className="h-[400px] overflow-hidden bg-pink-100">

              <img
                src="/luna1.PNG"
                alt="Luna"
                className="h-full w-full object-cover"
              />

            </div>


            {/* INFORMACIÓN */}
            <div className="p-8 md:p-10">

              <p className="font-semibold text-blue-600">
                🐾 Mascota en adopción
              </p>

              <h1 className="mt-2 text-4xl font-bold text-gray-800">
                Luna
              </h1>

              <p className="mt-2 text-lg text-gray-500">
                Gata · 1 año
              </p>

              <p className="mt-4 text-gray-500">
                📍 Quito
              </p>


              {/* SOBRE LUNA */}
              <div className="mt-8">

                <h2 className="text-xl font-bold text-gray-800">
                  Sobre Luna
                </h2>

                <p className="mt-3 leading-relaxed text-gray-600">
                  Luna es una gatita tranquila, cariñosa y muy
                  afectuosa. Disfruta de los mimos y busca una
                  familia que pueda brindarle un hogar seguro
                  y lleno de amor.
                </p>

              </div>


              {/* PERSONALIDAD */}
              <div className="mt-8">

                <h2 className="text-xl font-bold text-gray-800">
                  Personalidad
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">

                  <span className="rounded-full bg-pink-100 px-4 py-2 text-sm text-pink-700">
                    Cariñosa ❤️
                  </span>

                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
                    Tranquila
                  </span>

                  <span className="rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-700">
                    Amigable
                  </span>

                </div>

              </div>


              <a
  href="/adopcion?mascota=Luna"
  className="mt-8 block w-full rounded-full bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
>
  ❤️ Quiero adoptar a Luna
</a>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

