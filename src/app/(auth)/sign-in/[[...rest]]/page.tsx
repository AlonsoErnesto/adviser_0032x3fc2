'use client'
import ThemeToggle from '@/components/ThemeToggle'
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function SignInPage() {
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Datos para testimonios de estudiantes (con imágenes reales)
  const testimonials = [
    {
      quote:
        'Encontré un asesor experto en mi carrera en menos de un día. Increíble herramienta.',
      name: 'Mariana López',
      role: 'Ingeniería Biomédica',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop',
    },
    {
      quote:
        'Las asesorías personalizadas mejoraron mi promedio más de lo que esperaba.',
      name: 'Daniel Torres',
      role: 'Ciencias Computacionales',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
    },
    {
      quote:
        'El sistema de matching con asesores por especialidad es brillante y muy preciso.',
      name: 'Sofía Ramírez',
      role: 'Arquitectura',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop',
    },
  ]

  return (
    <div className="fixed inset-0 flex h-screen w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 md:flex-row">
      {/* Panel izquierdo (móvil: arriba) */}
      <div className="flex h-full w-full flex-col p-6 md:w-3/5 md:p-10 lg:w-2/3">
        {/* Logo y nombre */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <h1 className="ml-3 text-xl font-bold text-sky-600 dark:text-sky-400">
            MI ADVISER
          </h1>

          {/* Theme toggle en móvil */}
          <div className="ml-auto md:hidden">
            <ThemeToggle />
          </div>
        </motion.div>

        {/* Contenido principal */}
        <div className="flex flex-1 flex-col">
          {/* Sección hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h2 className="mb-2 text-2xl font-bold leading-tight text-slate-900 dark:text-white md:text-3xl">
              Conecta con el{' '}
              <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
                asesor académico
              </span>{' '}
              ideal para tu carrera
            </h2>
            <p className="max-w-lg text-slate-600 dark:text-slate-300">
              Plataforma especializada en conectar estudiantes con asesores
              verificados de su misma área de estudio.
            </p>
          </motion.div>

          {/* Dashboard preview con testimonios flotantes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mx-auto w-full flex-1 overflow-hidden rounded-xl border border-slate-200 shadow-lg dark:border-slate-800"
          >
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop"
              alt="Plataforma de asesores estudiantiles"
              fill
              className="h-full w-full object-cover"
              priority
            />

            {/* Overlay oscuro para mejorar legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Lema sobre la imagen */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                Aprende con los mejores
              </h3>
              <p className="max-w-md text-white/90">
                Asesores verificados de todas las especialidades y universidades
              </p>
            </div>

            {/* Testimonios flotantes como burbujas */}
            {testimonials.map((testimonial, index) => {
              const positions = [
                { top: '15%', right: '10%', delay: 0 },
                { top: '35%', left: '15%', delay: 0.5 },
                { top: '60%', right: '20%', delay: 1 },
              ]

              const floatAnimation = {
                y: [0, -10, 0],
                transition: {
                  duration: 5 + index,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: positions[index].delay,
                },
              }

              return (
                <motion.div
                  key={index}
                  className="absolute max-w-xs rounded-xl bg-white/90 p-4 shadow-xl backdrop-blur-sm dark:bg-slate-800/90"
                  style={positions[index]}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    ...floatAnimation,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 1 + index * 0.3,
                  }}
                >
                  <div className="mb-2 flex text-sky-600 dark:text-sky-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.17 5.17A3 3 0 0 0 7 3.75V9h5.25a3 3 0 0 0-3.08-3.83zm-6 0A3 3 0 0 0 1 3.75V9h5.25a3 3 0 0 0-3.08-3.83z" />
                    </svg>
                  </div>
                  <p className="mb-3 text-sm italic text-slate-700 dark:text-slate-200">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 grid grid-cols-3 gap-4"
          >
            {[
              { label: 'Asesores', value: '2,500+', icon: 'users' },
              { label: 'Especialidades', value: '120+', icon: 'bookmark' },
              { label: 'Satisfacción', value: '98%', icon: 'star' },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 bg-white/50 p-4 text-center backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className="text-xl font-bold text-sky-600 dark:text-sky-400">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Panel derecho (móvil: abajo) */}
      <div className="relative flex w-full flex-col items-center justify-center bg-white p-6 dark:bg-slate-900 md:w-2/5 md:p-10 lg:w-1/3">
        {/* Theme toggle en desktop */}
        <div className="absolute right-6 top-6 hidden md:block">
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
              Bienvenido a tu comunidad académica
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Inicia sesión para acceder a asesores especializados
            </p>
          </div>

          <SignedOut>
            <SignIn
              afterSignInUrl="/posts"
              appearance={{
                elements: {
                  card: 'shadow-md rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm w-full',
                  headerTitle:
                    'text-xl font-bold text-slate-900 dark:text-white',
                  headerSubtitle: 'text-sm text-slate-600 dark:text-slate-300',
                  socialButtonsBlockButton:
                    'bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg p-3 w-full transition-all duration-200 flex items-center justify-center',
                  formButtonPrimary:
                    'bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg p-3 w-full transition-all duration-200',
                  formFieldInput:
                    'border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200',
                  footer: 'hidden',
                },
              }}
            />
          </SignedOut>

          {/* Términos y condiciones */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6"
          >
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) =>
                  setTermsAccepted(checked === true)
                }
                className="mt-1"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-slate-600 dark:text-slate-300"
              >
                Acepto los{' '}
                <a
                  href="#"
                  className="text-sky-600 hover:underline dark:text-sky-400"
                >
                  Términos
                </a>{' '}
                y{' '}
                <a
                  href="#"
                  className="text-sky-600 hover:underline dark:text-sky-400"
                >
                  Privacidad
                </a>
              </Label>
            </div>
          </motion.div>

          {/* Características para estudiantes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8"
          >
            <h3 className="mb-3 text-lg font-medium text-slate-900 dark:text-white">
              Beneficios exclusivos
            </h3>

            <div className="space-y-3">
              {[
                'Asesores verificados por especialidad',
                'Sesiones personalizadas según tu horario',
                'Materiales de estudio exclusivos',
                'Planes de mejora académica personalizados',
                'Comunidad de estudiantes de tu carrera',
                'Evaluaciones y seguimiento continuo',
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600 dark:text-sky-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
