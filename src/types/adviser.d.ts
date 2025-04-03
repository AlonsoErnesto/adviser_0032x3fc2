// types/adviser.d.ts
export type Specialty = 'Ingeniería' | 'Sociales' | 'Medicina'
declare global {
  export interface Adviser {
    id: number
    name: string
    gender: 'Masculino' | 'Femenino'
    avatar: string
    specialty: Specialty
    profession: string
    university: string
    description: string
    experience: number
    location: string
  }

  export interface FilterValues {
    genero: string
    profesion: string
    experiencia: string
    ubicacion: string
    universidad: string
  }
}
export {}
