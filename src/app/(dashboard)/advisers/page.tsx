'use client'
import { useState, useMemo, useEffect } from 'react'
import FilterSection from '@/sections/advisers/FiltersSection'
import InputSearchSection from '@/sections/advisers/InputSearchSection'
import ListCardsAdvisersSection from '@/sections/advisers/ListCardsAdvisersSection'
import { Button } from '@/components/ui/button'
import { advisers } from '@/data/advisers'

const AdviserPage = () => {
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return {
      genero: searchParams.get('genero') || '',
      profesion: searchParams.get('profesion') || '',
      experiencia: searchParams.get('experiencia') || '',
      ubicacion: searchParams.get('ubicacion') || '',
      universidad: searchParams.get('universidad') || '',
    }
  })

  // Estado para controlar cuántos asesores se están mostrando
  const [visibleAdvisers, setVisibleAdvisers] = useState(10)

  useEffect(() => {
    // Actualizar URL cuando cambian los filtros
    const params = new URLSearchParams()
    if (filters.profesion) params.set('profesion', filters.profesion)
    if (filters.genero) params.set('genero', filters.genero)
    if (filters.experiencia) params.set('experiencia', filters.experiencia)
    if (filters.ubicacion) params.set('ubicacion', filters.ubicacion)
    if (filters.universidad) params.set('universidad', filters.universidad)
    window.history.pushState({}, '', `?${params.toString()}`)

    // Resetear la paginación cuando cambian los filtros
    setVisibleAdvisers(10)
  }, [filters])

  const handleSearch = (searchTerm: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      nombre: searchTerm,
    }))
  }

  const filteredAdvisers = useMemo(() => {
    return advisers.filter((adviser) => {
      if (filters.profesion && adviser.specialty !== filters.profesion) {
        return false
      }

      if (filters.ubicacion && !adviser.location.includes(filters.ubicacion)) {
        return false
      }

      if (
        filters.universidad &&
        !adviser.university.includes(filters.universidad)
      ) {
        return false
      }

      if (filters.experiencia) {
        const minExperience = parseInt(filters.experiencia) || 0
        if (adviser.experience < minExperience) {
          return false
        }
      }
      if (filters.genero && !adviser.gender.includes(filters.genero)) {
        return false
      }

      return true
    })
  }, [filters])

  // Obtener solo los asesores visibles actualmente
  const advisersToShow = filteredAdvisers.slice(0, visibleAdvisers)

  // Función para cargar más asesores
  const loadMoreAdvisers = () => {
    setVisibleAdvisers((prev) => prev + 10)
  }

  return (
    <div className="space-y-6">
      <div>
        <InputSearchSection onSearch={handleSearch} />
      </div>
      <div>
        <FilterSection onFilterChange={setFilters} />
      </div>
      <div>
        {advisersToShow.length === 0 ? (
          <div className="py-10 text-center">
            <p>No se encontraron asesores con los filtros seleccionados</p>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  genero: '',
                  profesion: '',
                  experiencia: '',
                  ubicacion: '',
                  universidad: '',
                })
              }
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <>
            <ListCardsAdvisersSection advisers={advisersToShow} />
            {visibleAdvisers < filteredAdvisers.length && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={loadMoreAdvisers}
                  variant="outline"
                  className="px-6 py-3"
                >
                  Mostrar más
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AdviserPage
