import Link from "next/link";

type Perro = {
  id: string;
  url: string;
  width: number;
  height: number;
};

async function obtenerPerros(): Promise<Perro[]> {
  try {
    const respuesta = await fetch(
      "https://api.thedogapi.com/v1/images/search?limit=6",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!respuesta.ok) {
      throw new Error("No se pudo conectar con The Dog API");
    }

    const datos: Perro[] = await respuesta.json();

    return datos;
  } catch (error) {
    console.error("Error al obtener perros:", error);
    return [];
  }
}

export default async function ApiPerrosPage() {
  const perros = await obtenerPerros();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-block text-blue-600 hover:underline"
        >
          ← Volver al inicio
        </Link>

        <h1 className="mb-2 text-4xl font-bold text-gray-800">
          🐾 Conoce otros perros
        </h1>

        <p className="mb-8 text-gray-600">
          Imágenes obtenidas dinámicamente desde una API externa.
        </p>

        {perros.length === 0 ? (
          <div className="rounded-lg bg-red-100 p-6 text-red-700">
            No pudimos cargar información de perros en este momento.
            Intenta nuevamente más tarde.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {perros.map((perro) => (
              <div
                key={perro.id}
                className="overflow-hidden rounded-xl bg-white shadow-md"
              >
                <img
                  src={perro.url}
                  alt="Perro obtenido desde The Dog API"
                  className="h-64 w-full object-cover"
                />

                <div className="p-4">
                  <p className="text-sm text-gray-500">
                    Imagen obtenida desde The Dog API
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}