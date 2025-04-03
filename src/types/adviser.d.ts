// types/adviser.d.ts
export type Specialty = 'Ingeniería' | 'Sociales' | 'Medicina'
declare global {
  interface Adviser {
    id: number
    name: string
    gender: 'Masculino' | 'Femenino'
    email: string
    avatar: string
    coverPhoto?: string // Nueva propiedad para foto de portada
    specialty: Specialty
    profession: string
    university: string
    description: string
    experience: number
    location: string
    friendsCount?: number // Opcional para estilo Facebook
    postsCount?: number // Opcional para estilo Facebook
    followers?: string[] // Array de IDs de usuarios que siguen a este asesor
    following?: string[] // Array de IDs de usuarios que este asesor sigue
  }

  interface FilterValues {
    genero: string
    profesion: string
    experiencia: string
    ubicacion: string
    universidad: string
  }
}
export {}
