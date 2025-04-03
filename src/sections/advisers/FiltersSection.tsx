'use client'
import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface FilterValues {
  genero: string
  profesion: string
  experiencia: string
  ubicacion: string
  universidad: string
}

interface FilterSectionProps {
  onFilterChange?: (filters: FilterValues) => void
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    genero: '',
    profesion: '',
    experiencia: '',
    ubicacion: '',
    universidad: '',
  })

  // Opciones para cada filtro
  const generos = ['Masculino', 'Femenino', 'No binario', 'Prefiero no decir']
  const profesiones = [
    'Ingeniería',
    'Ciencias Sociales',
    'Medicina',
    'Educación',
    'Derecho',
    'Economía',
  ]
  const experiencias = [
    'Bachiller',
    '1+ años',
    '3+ años',
    '5+ años',
    '10+ años',
  ]
  const ubicaciones = [
    'Lima',
    'Arequipa',
    'Ica',
    'Cusco',
    'Trujillo',
    'Piura',
    'Chiclayo',
  ]
  const universidades = ['UNMSM', 'UNI', 'UNSA', 'PUCP', 'UNFV', 'UNAC', 'UNT']

  // Actualizar un filtro específico
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Resetear todos los filtros
  const handleReset = () => {
    setFilters({
      genero: '',
      profesion: '',
      experiencia: '',
      ubicacion: '',
      universidad: '',
    })
  }

  // Propagar los cambios de filtros hacia el componente padre
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters)
    }
    console.log('Filtros actualizados:', filters)
  }, [filters, onFilterChange])

  // Verificar si hay algún filtro activo
  const hasActiveFilters = Object.values(filters).some((value) => value !== '')

  return (
    <div className="w-full rounded-lg border bg-white p-4 shadow dark:border-gray-700 dark:bg-black">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-500">
          Filtros
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          disabled={!hasActiveFilters}
          className={`flex items-center gap-1 ${
            hasActiveFilters
              ? 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              : 'cursor-not-allowed text-gray-300 dark:text-gray-600'
          }`}
        >
          <X size={16} />
          Borrar filtros
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Filtro por Género */}
        <div className="min-w-40 flex-1">
          <Select
            value={filters.genero}
            onValueChange={(value) => handleFilterChange('genero', value)}
          >
            <SelectTrigger className="w-full rounded-lg border bg-white dark:border-gray-600 dark:bg-black dark:text-gray-200">
              <SelectValue placeholder="Género" />
            </SelectTrigger>
            <SelectContent className="dark:bg-dark dark:border-gray-600">
              <SelectGroup>
                {generos.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                    className="dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-800"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Profesión */}
        <div className="min-w-40 flex-1">
          <Select
            value={filters.profesion}
            onValueChange={(value) => handleFilterChange('profesion', value)}
          >
            <SelectTrigger className="w-full bg-white dark:border-gray-600 dark:bg-black dark:text-gray-200">
              <SelectValue placeholder="Profesión" />
            </SelectTrigger>
            <SelectContent className="dark:border-gray-600 dark:bg-black">
              <SelectGroup>
                {profesiones.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                    className="dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-800"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Experiencia */}
        <div className="min-w-40 flex-1">
          <Select
            value={filters.experiencia}
            onValueChange={(value) => handleFilterChange('experiencia', value)}
          >
            <SelectTrigger className="w-full bg-white dark:border-gray-600 dark:bg-black dark:text-gray-200">
              <SelectValue placeholder="Experiencia" />
            </SelectTrigger>
            <SelectContent className="dark:border-gray-600 dark:bg-black">
              <SelectGroup>
                {experiencias.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                    className="dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-800"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Ubicación */}
        <div className="min-w-40 flex-1">
          <Select
            value={filters.ubicacion}
            onValueChange={(value) => handleFilterChange('ubicacion', value)}
          >
            <SelectTrigger className="w-full bg-white dark:border-gray-600 dark:bg-black dark:text-gray-200">
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent className="dark:border-gray-600 dark:bg-black">
              <SelectGroup>
                {ubicaciones.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                    className="dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-800"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por Universidad */}
        <div className="min-w-40 flex-1">
          <Select
            value={filters.universidad}
            onValueChange={(value) => handleFilterChange('universidad', value)}
          >
            <SelectTrigger className="w-full bg-white dark:border-gray-600 dark:bg-black dark:text-gray-200">
              <SelectValue placeholder="Universidad" />
            </SelectTrigger>
            <SelectContent className="dark:border-gray-600 dark:bg-black">
              <SelectGroup>
                {universidades.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                    className="dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-800"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default FilterSection
