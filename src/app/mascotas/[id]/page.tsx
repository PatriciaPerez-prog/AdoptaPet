"use client"; 
 
import { useEffect, useState } from "react"; 
import { useParams, useRouter } from "next/navigation"; 
import Link from "next/link"; 
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
 
export default function MascotaPage() { 
  const params = useParams(); 
  const router = useRouter(); 
 
  const [mascota, setMascota] = useState<Mascota | null>(null); 
  const [cargando, setCargando] = useState(true); 
  const [error, setError] = useState(""); 
 
  useEffect(() => { 
    async function cargarMascota() { 
      const id = params.id as string; 
 
      if (!id) { 
        setError("No se encontró la mascota."); 
        setCargando(false); 
        return; 
      } 
 
      const { data, error } = await supabase 
        .from("mascotas") 
        .select("*") 
        .eq("id", id) 
        .maybeSingle(); 
 
      if (error) { 
        console.error("ERROR OBTENIENDO MASCOTA:", error); 
        setError("No se pudo cargar la información de la mascota."); 
        setCargando(false); 
        return; 
      } 
 
      if (!data) { 
        setError("La mascota no existe o ya no está disponible."); 
        setCargando(false); 
        return; 
      } 
 
      setMascota(data); 
      setCargando(false); 
    } 
 
    cargarMascota(); 
  }, [params.id]); 
 
  if (cargando) { 
    return ( 
      <main className="min-h-screen bg-blue-50 flex items-center justify-center"> 
        <div className="text-center"> 
          <div className="text-6xl mb-4">🐾</div> 
 
          <p className="text-gray-600"> 
            Cargando información de la mascota... 
          </p> 
        </div> 
      </main> 
    ); 
  } 
 
  if (error || !mascota) { 
    return ( 
      <main className="min-h-screen bg-blue-50 px-6 py-12"> 
        <div className="mx-auto max-w-4xl text-center"> 
          <div className="rounded-3xl bg-white p-10 shadow-lg"> 
 
            <div className="text-7xl">🐾</div> 
 
            <h1 className="mt-6 text-3xl font-bold text-gray-800"> 
              Mascota no encontrada 
            </h1> 
 
            <p className="mt-4 text-gray-600"> 
              {error || "No se pudo encontrar esta mascota."} 
            </p> 
 
            <button 
              onClick={() => router.push("/#mascotas")} 
              className="mt-8 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700" 
            > 
              ← Volver a mascotas 
            </button> 
 
          </div> 
        </div> 
      </main> 
    ); 
  } 
 
  return ( 
    <main className="min-h-screen bg-blue-50 px-6 py-12"> 
 
      <div className="mx-auto max-w-4xl"> 
 
        <Link 
          href="/#mascotas" 
          className="font-semibold text-blue-600 hover:underline" 
        > 
          ← Volver a mascotas 
        </Link> 
 
        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg"> 
 
          <div className="grid md:grid-cols-2"> 
 
            {/* IMAGEN */} 
            <div className="h-[400px] overflow-hidden bg-blue-100"> 
 
              {mascota.imagen ? ( 
                <img 
                  src={mascota.imagen} 
                  alt={mascota.nombre} 
                  className="h-full w-full object-cover" 
                /> 
              ) : ( 
                <div className="flex h-full items-center justify-center text-8xl"> 
                  🐾 
                </div> 
              )} 
 
            </div> 
 
            {/* INFORMACIÓN */} 
            <div className="p-8 md:p-10"> 
 
              <p className="font-semibold text-blue-600"> 
                🐾 Mascota en adopción 
              </p> 
 
              <h1 className="mt-2 text-4xl font-bold text-gray-800"> 
                {mascota.nombre} 
              </h1> 
 
              <p className="mt-2 text-lg text-gray-500"> 
                {mascota.tipo} · {mascota.edad} 
              </p> 
 
              <p className="mt-4 text-gray-500"> 
                📍 {mascota.ubicacion} 
              </p> 
 
              {/* DESCRIPCIÓN */} 
              <div className="mt-8"> 
 
                <h2 className="text-xl font-bold text-gray-800"> 
                  Sobre {mascota.nombre} 
                </h2> 
 
                <p className="mt-3 leading-relaxed text-gray-600"> 
                  {mascota.descripcion || 
                    "Esta mascota está esperando encontrar un hogar lleno de amor."} 
                </p> 
 
              </div> 
 
              {/* PERSONALIDAD */} 
              <div className="mt-8"> 
 
                <h2 className="text-xl font-bold text-gray-800"> 
                  Personalidad 
                </h2> 
 
                <div className="mt-3 flex flex-wrap gap-2"> 
 
                  {mascota.personalidad?.map((caracteristica) => ( 
                    <span 
                      key={caracteristica} 
                      className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700" 
                    > 
                      {caracteristica} 
                    </span> 
                  ))} 
 
                </div> 
 
              </div> 
 
              {/* ADOPTAR */} 
              <Link 
                href={`/adopcion?mascota=${encodeURIComponent( 
                  mascota.nombre 
                )}`} 
                className="mt-8 block w-full rounded-full bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700" 
              > 
                ❤️ Quiero adoptar a {mascota.nombre} 
              </Link> 
 
            </div> 
 
          </div> 
 
        </div> 
 
      </div> 
 
    </main> 
  ); 
} 
 
