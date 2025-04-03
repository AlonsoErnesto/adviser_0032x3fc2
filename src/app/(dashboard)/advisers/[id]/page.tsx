// src/app/(dashboard)/advisers/[id]/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  Briefcase,
  Clock,
  MapPin,
  GraduationCap,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { advisers } from '@/data/advisers'
import { notFound } from 'next/navigation'

// Datos de ejemplo para publicaciones
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

export default function AdviserProfile({ params }: { params: { id: string } }) {
  const adviser = advisers.find((a) => a.id.toString() === params.id)

  if (!adviser) {
    return notFound()
  }

  const getSpecialtyColor = (specialty: string): string => {
    switch (specialty) {
      case 'Ingeniería':
        return 'bg-blue-100 text-blue-800'
      case 'Medicina':
        return 'bg-green-100 text-green-800'
      case 'Sociales':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header con botón de volver */}
      <div className="mb-6 flex items-center">
        <Link href="/advisers">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Volver
          </Button>
        </Link>
        <h1 className="ml-4 text-2xl font-bold">Perfil de {adviser.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Columna izquierda - Información personal */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold">Información personal</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Profesión</p>
                  <p className="font-medium">{adviser.profession}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Universidad</p>
                  <p className="font-medium">{adviser.university}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Experiencia</p>
                  <p className="font-medium">{adviser.experience} años</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="font-medium">{adviser.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold">Sobre mí</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{adviser.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha - Muro de publicaciones */}
        <div className="space-y-6 lg:col-span-2">
          {/* Crear nueva publicación */}
          <Card>
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
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Publicar</Button>
            </CardFooter>
          </Card>

          {/* Lista de publicaciones */}
          {mockPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={adviser.avatar} />
                      <AvatarFallback>{adviser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{adviser.name}</p>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal size={18} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {post.likes} Me gusta
                </Button>
                <Button variant="ghost">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {post.comments} Comentarios
                </Button>
                <Button variant="ghost">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
