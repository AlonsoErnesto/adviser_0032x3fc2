'use client'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  Camera,
  Edit,
  CircleEllipsis,
  MessageCircle,
  MoreHorizontal,
  ThumbsUp,
  Share2,
  Users,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Home,
  Image as ImageIcon,
  Film,
  Flag,
  Bookmark,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import PostCard from '@/sections/profile/PostCard'
import FriendCard from '@/sections/profile/FriendCard'
import PhotoCard from '@/sections/profile/PhotoCard'

const ProfilePage = () => {
  const { user } = useUser()

  if (!user) return null

  // Datos de ejemplo para el perfil
  const profileData = {
    coverPhoto:
      'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=1200&auto=format&fit=crop',
    avatar: user.imageUrl,
    name: user.fullName || 'Usuario',
    bio: 'Apasionado por compartir conocimiento y ayudar a otros estudiantes',
    friends: 1256,
    posts: 342,
    photos: 178,
    details: {
      worksAt: 'Universidad Nacional',
      studiedAt: 'Ingeniería de Sistemas',
      livesIn: 'Bogotá, Colombia',
      from: 'Medellín, Colombia',
      joined: 'Agosto 2015',
    },
  }

  // Datos de ejemplo para publicaciones
  const posts = [
    {
      id: 1,
      content:
        'Acabo de publicar mi nuevo artículo sobre ingeniería de software. ¡Échenle un vistazo!',
      date: '2 horas ago',
      likes: 15,
      comments: 4,
      shares: 2,
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop',
      ],
    },
    {
      id: 2,
      content:
        'Estoy disponible para asesorías este fin de semana. ¡Reserven su horario!',
      date: '1 día ago',
      likes: 8,
      comments: 3,
      shares: 1,
      images: [],
    },
  ]

  // Datos de ejemplo para amigos
  const friends = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    name: `Amigo ${i + 1}`,
    avatar: `https://randomuser.me/api/portraits/${
      i % 2 === 0 ? 'men' : 'women'
    }/${i + 1}.jpg`,
    mutualFriends: Math.floor(Math.random() * 10),
  }))

  // Datos de ejemplo para fotos
  const photos = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    url: `https://images.unsplash.com/photo-${
      150 + i
    }?w=500&auto=format&fit=crop`,
    date: `${Math.floor(Math.random() * 12) + 1} meses ago`,
  }))

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {/* HeadSection - Portada y foto de perfil */}
      <div className="relative">
        {/* Portada */}
        <div className="h-80 w-full overflow-hidden bg-gray-300 dark:bg-gray-800">
          <img
            src={profileData.coverPhoto}
            alt="Portada"
            className="h-full w-full object-cover"
          />
          <div className="absolute right-4 top-4 flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90"
            >
              <Camera size={16} />
              <span>Editar portada</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/90 dark:bg-gray-800/90"
            >
              <CircleEllipsis size={16} />
            </Button>
          </div>
        </div>

        {/* Foto de perfil y nombre */}
        <div className="container relative -mt-16 px-4">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-6">
              <div className="relative h-32 w-32 rounded-full border-4 border-white bg-white dark:border-gray-900 dark:bg-gray-900">
                <img
                  src={profileData.avatar}
                  alt="Perfil"
                  className="h-full w-full rounded-full object-cover"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -right-2 -top-2 h-10 w-10 rounded-full bg-white dark:bg-gray-800"
                >
                  <Camera size={16} />
                </Button>
              </div>
              <div className="mb-1">
                <h1 className="text-3xl font-bold dark:text-white">
                  {profileData.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {profileData.friends} amigos
                </p>
              </div>
            </div>

            <div className="mb-4 flex gap-2">
              <Button variant="outline" size="icon">
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ContentSection - Pestañas y contenido */}
      <div className="container mt-4 px-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start bg-transparent p-0">
            <TabsTrigger value="posts" className="px-4 py-3">
              Publicaciones
            </TabsTrigger>
            <TabsTrigger value="about" className="px-4 py-3">
              Información
            </TabsTrigger>
            <TabsTrigger value="friends" className="px-4 py-3">
              Amigos
            </TabsTrigger>
            <TabsTrigger value="photos" className="px-4 py-3">
              Fotos
            </TabsTrigger>
            <TabsTrigger value="more" className="px-4 py-3">
              Más
            </TabsTrigger>
          </TabsList>

          <Separator className="my-1" />

          {/* Contenido de las pestañas */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* InfoSection - Columna izquierda (información) */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-bold dark:text-white">
                  Introducción
                </h2>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Edit size={16} />
                    <span>Agregar bio</span>
                  </Button>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase
                        size={18}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      <span className="dark:text-gray-300">
                        Trabaja en {profileData.details.worksAt}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap
                        size={18}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      <span className="dark:text-gray-300">
                        Estudió {profileData.details.studiedAt}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home
                        size={18}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      <span className="dark:text-gray-300">
                        Vive en {profileData.details.livesIn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={18}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      <span className="dark:text-gray-300">
                        De {profileData.details.from}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar
                        size={18}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      <span className="dark:text-gray-300">
                        Se unió en {profileData.details.joined}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Edit size={16} />
                    <span>Editar detalles</span>
                  </Button>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold dark:text-white">Fotos</h2>
                  <Button
                    variant="ghost"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    Ver todas
                  </Button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {photos.slice(0, 9).map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={photo.url}
                        alt={`Foto ${photo.id}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold dark:text-white">Amigos</h2>
                  <Button
                    variant="ghost"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    Ver todos
                  </Button>
                </div>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {profileData.friends} amigos
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {friends.slice(0, 9).map((friend) => (
                    <div key={friend.id} className="text-center">
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="aspect-square w-full object-cover"
                        />
                      </div>
                      <p className="mt-1 text-sm font-medium dark:text-white">
                        {friend.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {friend.mutualFriends} amigos en común
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ContentSection - Columna derecha (publicaciones) */}
            <div className="lg:col-span-2">
              <TabsContent value="posts" className="space-y-4">
                {/* Crear publicación */}
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src={profileData.avatar}
                        alt="Perfil"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      ¿Qué estás pensando, {profileData.name.split(' ')[0]}?
                    </Button>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between">
                    <Button variant="ghost" className="flex-1 gap-2">
                      <ImageIcon size={18} className="text-green-500" />
                      <span>Foto/video</span>
                    </Button>
                    <Button variant="ghost" className="flex-1 gap-2">
                      <Users size={18} className="text-blue-500" />
                      <span>Etiquetar amigos</span>
                    </Button>
                    <Button variant="ghost" className="flex-1 gap-2">
                      <Flag size={18} className="text-yellow-500" />
                      <span>Sentimiento/actividad</span>
                    </Button>
                  </div>
                </div>

                {/* Publicaciones */}
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} user={profileData} />
                ))}
              </TabsContent>

              <TabsContent value="about">
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                  <h2 className="mb-4 text-xl font-bold dark:text-white">
                    Información
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">
                        Detalles personales
                      </h3>
                      <div className="mt-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <Briefcase
                            size={18}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          <span className="dark:text-gray-300">
                            Trabaja en {profileData.details.worksAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap
                            size={18}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          <span className="dark:text-gray-300">
                            Estudió {profileData.details.studiedAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home
                            size={18}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          <span className="dark:text-gray-300">
                            Vive en {profileData.details.livesIn}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin
                            size={18}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          <span className="dark:text-gray-300">
                            De {profileData.details.from}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar
                            size={18}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          <span className="dark:text-gray-300">
                            Se unió en {profileData.details.joined}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">
                        Fotos
                      </h3>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {photos.slice(0, 9).map((photo) => (
                          <PhotoCard key={photo.id} photo={photo} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">
                        Amigos
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        {profileData.friends} amigos
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {friends.slice(0, 9).map((friend) => (
                          <FriendCard key={friend.id} friend={friend} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="friends">
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold dark:text-white">
                      Amigos
                    </h2>
                    <div className="flex gap-2">
                      <Button variant="outline">Buscar amigos</Button>
                      <Button variant="outline">Solicitudes</Button>
                    </div>
                  </div>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {profileData.friends} amigos
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {friends.map((friend) => (
                      <FriendCard key={friend.id} friend={friend} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="photos">
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold dark:text-white">Fotos</h2>
                    <Button variant="outline">Agregar fotos</Button>
                  </div>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {profileData.photos} fotos
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {photos.map((photo) => (
                      <PhotoCard key={photo.id} photo={photo} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage
