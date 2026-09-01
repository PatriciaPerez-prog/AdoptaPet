export default function TobyPage() {
  return (
    <main className="min-h-screen bg-blue-50 px-6 py-12">

      <div className="mx-auto max-w-4xl">

        <a
          href="/#mascotas"
          className="font-semibold text-blue-600 hover:underline"
        >
          ← Volver a mascotas
        </a>

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">

          <div className="grid md:grid-cols-2">

            {/* FOTO */}
            <div className="h-[400px] overflow-hidden bg-blue-100">
              <img
                src="/toby1.JPEG"
                alt="Toby"
                className="h-full w-full object-cover"
              />
            </div>

            {/* INFORMACIÓN */}
            <div className="p-8 md:p-10">

              <p className="font-semibold text-blue-600">
                🐾 Mascota en adopción
              </p>

              <h1 className="mt-2 text-4xl font-bold text-gray-800">
                Toby
              </h1>

              <p className="mt-2 text-lg text-gray-500">
                Mestizo · 3 años
              </p>

              <p className="mt-4 text-gray-500">
                📍 Quito
              </p>

              <div className="mt-8">

                <h2 className="text-xl font-bold text-gray-800">
                  Sobre Toby
                </h2>

                <p className="mt-3 leading-relaxed text-gray-600">
                  Toby es un perro juguetón, obediente y muy cariñoso.
                  Busca una familia amorosa que pueda brindarle un hogar
                  seguro, compañía y muchos momentos felices.
                </p>

              </div>

              <div className="mt-8">

                <h2 className="text-xl font-bold text-gray-800">
                  Personalidad
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">

                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
                    Juguetón 🐾
                  </span>

                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
                    Obediente
                  </span>

                  <span className="rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-700">
                    Cariñoso ❤️
                  </span>

                </div>

              </div>

              <a
  href="/adopcion?mascota=Toby"
  className="mt-8 block w-full rounded-full bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
>
  ❤️ Quiero adoptar a Toby
</a>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}