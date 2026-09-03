import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Rutas públicas
  const paginasPublicas = [
    "/",
    "/login",
    "/registro",
    "/mascotas",
  ];

  // Permitir cualquier página individual de mascota:
  // /mascotas/1
  // /mascotas/2
  // /mascotas/abc123
  const esPaginaMascota = pathname.startsWith("/mascotas/");

  if (paginasPublicas.includes(pathname) || esPaginaMascota) {
    return response;
  }

  // Las demás rutas requieren iniciar sesión
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/registro",
    "/mascotas/:path*",
    "/adopcion/:path*",
    "/nosotros/:path*",
    "/contacto/:path*",
  ],
};