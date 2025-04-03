import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MapPin, Briefcase, GraduationCap, Clock } from 'lucide-react'
import { Adviser } from '@/types/adviser'

type Specialty = 'Ingeniería' | 'Sociales' | 'Medicina'
interface ListCardsAdvisersSectionProps {
  advisers: Adviser[]
}

// Función para obtener color de badge según especialidad
const getSpecialtyColor = (specialty: Specialty): string => {
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

// Función para obtener color para la universidad según especialidad
const getUniversityColor = (specialty: Specialty): string => {
  switch (specialty) {
    case 'Ingeniería':
      return 'text-blue-700'
    case 'Medicina':
      return 'text-green-700'
    case 'Sociales':
      return 'text-purple-700'
    default:
      return 'text-gray-700'
  }
}

// Función para obtener color para la profesión según especialidad
const getProfessionColor = (specialty: Specialty): string => {
  switch (specialty) {
    case 'Ingeniería':
      return 'text-blue-600'
    case 'Medicina':
      return 'text-green-600'
    case 'Sociales':
      return 'text-purple-600'
    default:
      return 'text-gray-600'
  }
}

// Función para obtener las iniciales del nombre
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

const ListCardsAdvisersSection = ({
  advisers,
}: ListCardsAdvisersSectionProps) => {
  return (
    <section className="mt-10 w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {advisers.map((adviser) => (
          <Card
            key={adviser.id}
            onClick={() => (window.location.href = `/advisers/${adviser.id}`)}
            className="h-full cursor-pointer overflow-hidden border-l-4 transition-all duration-300 hover:shadow-lg"
            style={{
              borderLeftColor:
                adviser.specialty === 'Ingeniería'
                  ? '#3b82f6'
                  : adviser.specialty === 'Medicina'
                    ? '#10b981'
                    : '#8b5cf6',
            }}
          >
            <div className="flex h-full flex-col">
              {/* Card Content - Usando layout 20/80 */}
              <div className="flex flex-1 p-4 md:p-5">
                {/* Columna Avatar - 20% */}
                <div className="mr-4 w-1/5 md:mr-5">
                  <Avatar className="h-16 w-16 md:h-20 md:w-20">
                    <AvatarImage src={adviser.avatar} alt={adviser.name} />
                    <AvatarFallback className="text-lg">
                      {getInitials(adviser.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Columna Contenido - 80% */}
                <div className="w-4/5">
                  <div className="mb-2 md:mb-3">
                    <h3 className="text-lg font-bold md:text-xl">
                      {adviser.name}
                    </h3>
                    <div className="mt-1">
                      <Badge
                        className={`${getSpecialtyColor(
                          adviser.specialty,
                        )} px-3 py-1 text-xs md:text-sm`}
                      >
                        {adviser.specialty}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="space-y-3 p-0 md:space-y-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 md:h-5 md:w-5" />
                      <span
                        className={`text-sm font-medium md:text-base ${getProfessionColor(
                          adviser.specialty,
                        )}`}
                      >
                        {adviser.profession}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 md:h-5 md:w-5" />
                      <span
                        className={`text-sm font-medium md:text-base ${getUniversityColor(
                          adviser.specialty,
                        )}`}
                      >
                        {adviser.university}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 md:text-base">
                      {adviser.description}
                    </p>
                  </CardContent>
                </div>
              </div>

              {/* Card Footer - Manteniendo en posición bottom */}
              <CardFooter className="flex items-center justify-between border-t bg-gray-50 px-4 py-3 dark:bg-gray-900 md:px-6 md:py-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500 md:h-5 md:w-5" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400 md:text-base">
                    {adviser.experience} años de experiencia
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 md:h-5 md:w-5" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400 md:text-base">
                    {adviser.location}
                  </span>
                </div>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default ListCardsAdvisersSection
