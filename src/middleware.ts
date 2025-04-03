import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/utils/supabase'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Definir rutas públicas (accesibles sin autenticación)
const isPublicRoute = createRouteMatcher(['/sign-in(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()
  const pathname = req.nextUrl.pathname

  // 🔹 Si el usuario está autenticado y trata de entrar a una ruta pública (como /sign-in), redirigir a /posts
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/posts', req.url))
  }

  // 🔹 Si el usuario no está autenticado y trata de entrar a una ruta no pública, redirigir a /sign-in
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // 🔹 Lógica de Supabase (opcional)
  const { supabase, response } = createMiddlewareClient(req)
  await supabase.auth.getSession()

  return response
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/(api|trpc)(.*)'],
}
