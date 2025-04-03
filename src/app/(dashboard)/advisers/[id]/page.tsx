'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  UserPlus,
  CircleEllipsis,
  Users,
  Image as ImageIcon,
  Info,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { advisers } from '@/data/advisers'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

// Datos de ejemplo
const mockPosts = [
  {
    id: 1,
    content:
      'Acabo de publicar mi nuevo artículo sobre ingeniería de software. ¡Échenle un vistazo!',
    date: '2 horas ago',
    likes: 15,
    comments: 4,
    shares: 2,
  },
  {
    id: 2,
    content:
      'Estoy disponible para asesorías este fin de semana. ¡Reserven su horario!',
    date: '1 día ago',
    likes: 8,
    comments: 3,
    shares: 1,
  },
]

// Fotos de ejemplo
const mockPhotos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&auto=format&fit=crop',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=500&auto=format&fit=crop',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=500&auto=format&fit=crop',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop',
  },
]

// Estudiantes de ejemplo
const mockStudents = [
  {
    id: 1,
    name: 'Ana García',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Carlos López',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 3,
    name: 'María Rodríguez',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 4,
    name: 'José Martínez',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
]

export default function AdviserProfile({ params }: { params: { id: string } }) {
  const adviser = advisers.find((a) => a.id.toString() === params.id)
  const [activeTab, setActiveTab] = useState('publicaciones')
  const { user } = useUser()
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(
    adviser?.friendsCount || 0,
  )

  useEffect(() => {
    // Verificar si el usuario actual sigue a este asesor
    if (user && adviser) {
      const following = adviser.followers?.includes(user.id)
      setIsFollowing(!!following)
    }
  }, [user, adviser])

  if (!adviser) {
    return notFound()
  }

  const handleFollow = async () => {
    try {
      // Simulación de llamada a API
      if (isFollowing) {
        // Dejar de seguir
        // En una implementación real, aquí harías una llamada a tu API
        setIsFollowing(false)
        setFollowersCount((prev) => prev - 1)
      } else {
        // Seguir
        // En una implementación real, aquí harías una llamada a tu API
        setIsFollowing(true)
        setFollowersCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error('Error al seguir/dejar de seguir:', error)
    }
  }
  if (!adviser) {
    return notFound()
  }

  const coverPhoto =
    adviser.coverPhoto ||
    'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=2070&auto=format&fit=crop'

  const renderTabContent = () => {
    switch (activeTab) {
      case 'informacion':
        return (
          <div className="space-y-6 lg:col-span-3">
            <Card className="dark:border-gray-700 dark:bg-gray-800">
              <CardHeader className="dark:border-b dark:border-gray-700">
                <h2 className="flex items-center gap-2 text-xl font-semibold dark:text-white">
                  <Info size={20} /> Información detallada
                </h2>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium dark:text-gray-200">
                      Educación
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {adviser.university}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Licenciado en {adviser.profession}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium dark:text-gray-200">
                      Experiencia
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {adviser.experience} años en el área
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium dark:text-gray-200">
                      Contacto
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Email: {adviser.name.toLowerCase().replace(' ', '.')}
                      @universidad.edu
                    </p>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">
                      Teléfono: +1 234 567 890
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium dark:text-gray-200">
                      Ubicación
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {adviser.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'estudiantes':
        return (
          <div className="space-y-6 lg:col-span-3">
            <Card className="dark:border-gray-700 dark:bg-gray-800">
              <CardHeader className="dark:border-b dark:border-gray-700">
                <h2 className="flex items-center gap-2 text-xl font-semibold dark:text-white">
                  <Users size={20} /> Estudiantes ({mockStudents.length})
                </h2>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {mockStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex flex-col items-center text-center"
                    >
                      <Avatar className="mb-2 h-20 w-20">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium dark:text-gray-200">
                        {student.name}
                      </p>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 dark:text-blue-400"
                      >
                        Ver perfil
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'fotos':
        return (
          <div className="space-y-6 lg:col-span-3">
            <Card className="dark:border-gray-700 dark:bg-gray-800">
              <CardHeader className="dark:border-b dark:border-gray-700">
                <h2 className="flex items-center gap-2 text-xl font-semibold dark:text-white">
                  <ImageIcon size={20} /> Fotos ({mockPhotos.length})
                </h2>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {mockPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative aspect-square overflow-hidden rounded-lg"
                    >
                      <Image
                        src={photo.url}
                        alt={`Foto ${photo.id}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default: // publicaciones
        return (
          <>
            <div className="space-y-6 lg:col-span-2">
              {/* Crear publicación */}
              {user?.primaryEmailAddress?.emailAddress === adviser.email && (
                <Card className="dark:border-gray-700 dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={adviser.avatar} />
                        <AvatarFallback>{adviser.name[0]}</AvatarFallback>
                      </Avatar>
                      <Textarea
                        placeholder={`¿Qué estás pensando, ${
                          adviser.name.split(' ')[0]
                        }?`}
                        className="min-h-[80px] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t dark:border-gray-700">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Foto
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Video
                      </Button>
                    </div>
                    <Button className="dark:bg-blue-600 dark:hover:bg-blue-700">
                      Publicar
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Publicaciones */}
              {mockPosts.map((post) => (
                <Card
                  key={post.id}
                  className="dark:border-gray-700 dark:bg-gray-800"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={adviser.avatar} />
                          <AvatarFallback>{adviser.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold dark:text-white">
                            {adviser.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {post.date}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="dark:hover:bg-gray-700"
                      >
                        <MoreHorizontal
                          size={18}
                          className="dark:text-gray-300"
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-800 dark:text-gray-200">
                      {post.content}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      className="dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Me gusta
                    </Button>
                    <Button
                      variant="ghost"
                      className="dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Comentar
                    </Button>
                    <Button
                      variant="ghost"
                      className="dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Botón de volver */}
      <div className="container mx-auto pt-4">
        <Link href="/advisers">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Volver
          </Button>
        </Link>
      </div>

      {/* Foto de portada */}
      <div className="relative h-64 bg-blue-500">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${coverPhoto})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-50"></div>
        </div>
      </div>

      {/* Sección del perfil */}
      <div className="container mx-auto px-4">
        {/* Encabezado del perfil */}
        <div className="relative">
          <div className="-mt-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="flex items-end gap-4">
              <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800">
                <AvatarImage src={adviser.avatar} />
                <AvatarFallback className="text-4xl text-black dark:text-white">
                  {adviser.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="mb-1">
                <h1 className="text-2xl font-bold text-black dark:text-gray-100">
                  {adviser.name}
                </h1>
                <p className="text-black dark:text-gray-300">
                  {adviser.profession}
                </p>
              </div>
            </div>

            <div className="mb-4 flex gap-2">
              <Button
                variant={isFollowing ? 'default' : 'outline'}
                className={`${
                  isFollowing
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                }`}
                onClick={handleFollow}
              >
                {isFollowing ? (
                  'Siguiendo'
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Contactar
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <CircleEllipsis className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Barra de navegación del perfil */}
          <div className="mt-4 border-b dark:border-gray-700">
            <nav className="flex space-x-4">
              <Button
                variant="ghost"
                className={`font-semibold dark:text-white ${
                  activeTab === 'publicaciones'
                    ? 'border-b-2 border-blue-500 dark:border-blue-400'
                    : ''
                }`}
                onClick={() => setActiveTab('publicaciones')}
              >
                Publicaciones
              </Button>
              <Button
                variant="ghost"
                className={`dark:text-gray-300 ${
                  activeTab === 'informacion'
                    ? 'border-b-2 border-blue-500 dark:border-blue-400'
                    : ''
                }`}
                onClick={() => setActiveTab('informacion')}
              >
                Información
              </Button>
              <Button
                variant="ghost"
                className={`dark:text-gray-300 ${
                  activeTab === 'estudiantes'
                    ? 'border-b-2 border-blue-500 dark:border-blue-400'
                    : ''
                }`}
                onClick={() => setActiveTab('estudiantes')}
              >
                Estudiantes
              </Button>
              <Button
                variant="ghost"
                className={`dark:text-gray-300 ${
                  activeTab === 'fotos'
                    ? 'border-b-2 border-blue-500 dark:border-blue-400'
                    : ''
                }`}
                onClick={() => setActiveTab('fotos')}
              >
                Fotos
              </Button>
            </nav>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="my-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {renderTabContent()}

          {/* Columna izquierda solo se muestra en pestaña de publicaciones */}
          {activeTab === 'publicaciones' && (
            <div className="space-y-6 lg:col-span-1">
              <Card className="dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="dark:border-b dark:border-gray-700">
                  <h2 className="text-xl font-semibold dark:text-white">
                    Información
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Universidad
                    </p>
                    <p className="font-medium dark:text-gray-200">
                      {adviser.university}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Experiencia
                    </p>
                    <p className="font-medium dark:text-gray-200">
                      {adviser.experience} años
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ubicación
                    </p>
                    <p className="font-medium dark:text-gray-200">
                      {adviser.location}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="dark:border-b dark:border-gray-700">
                  <h2 className="text-xl font-semibold dark:text-white">
                    Sobre mí
                  </h2>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    {adviser.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
