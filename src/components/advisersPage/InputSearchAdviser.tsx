'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Adviser } from '@/types/adviser'
import { advisers } from '@/data/advisers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

interface InputSearchAdviserProps {
  onSearch: (searchTerm: string) => void
  searchLimit?: number
}

const InputSearchAdviser = ({
  onSearch,
  searchLimit = 100,
}: InputSearchAdviserProps) => {
  const [placeholder, setPlaceholder] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Adviser[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const phrases = ['Busca médicos', 'Busca ingenieros', 'Busca calidad']
  const typingSpeed = 80
  const deletingSpeed = 50
  const pauseTime = 2000

  // Efecto para el placeholder animado
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (isDeleting && placeholder === '') {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
          return
        }

        if (!isDeleting && placeholder === phrases[currentIndex]) {
          setTimeout(() => setIsDeleting(true), pauseTime)
          return
        }

        const nextPlaceholder = isDeleting
          ? placeholder.substring(0, placeholder.length - 1)
          : phrases[currentIndex].substring(0, placeholder.length + 1)

        setPlaceholder(nextPlaceholder)
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [placeholder, isDeleting, currentIndex, phrases])

  // Efecto para buscar sugerencias con debounce y loading
  useEffect(() => {
    const searchAdvisers = async () => {
      if (searchTerm.length > 0) {
        setIsLoading(true)

        // Simulamos un pequeño retraso para el loading
        await new Promise((resolve) => setTimeout(resolve, 200))

        const filtered = advisers
          .filter((adviser) =>
            adviser.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .slice(0, searchLimit) // Aplicamos el límite

        setSuggestions(filtered)
        setShowSuggestions(true)
        setIsLoading(false)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }

    const timer = setTimeout(searchAdvisers, 500) // Debounce de 500ms

    return () => {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }, [searchTerm, searchLimit])

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSuggestionClick = (adviser: Adviser) => {
    setSearchTerm(adviser.name)
    setShowSuggestions(false)
    onSearch(adviser.name)
    setSearchTerm(adviser.name)
    setShowSuggestions(false)
    window.location.href = `/advisers/${adviser.id}`
  }

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="mx-auto flex w-full justify-center p-6">
      <div className="relative w-4/5">
        {/* Input con borde animado */}
        <div className="relative">
          <div
            className="absolute -inset-0.5 rounded-lg opacity-80"
            style={{
              background:
                'linear-gradient(-45deg, #0c0a09, #6b21a8, #047857, #0c4a6e)',
              backgroundSize: '400% 400%',
              animation: 'gradient 6s ease infinite',
            }}
          />

          <div className="relative flex items-center overflow-hidden rounded-md bg-white dark:bg-gray-900">
            <div className="absolute left-4 text-gray-400">
              <Search size={22} />
            </div>
            <Input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              className="w-full rounded-md border-none bg-white py-3 pl-12 pr-4 text-lg font-medium shadow-sm transition-all duration-300 focus:outline-none focus:ring-0 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Lista de sugerencias con loading */}
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            {isLoading ? (
              <div className="space-y-2 p-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-2">
                    <Skeleton className="h-10 w-10 rounded-full dark:bg-gray-500" />
                    <div className="space-y-2 ">
                      <Skeleton className="h-4 w-[200px] dark:bg-gray-500 " />
                      <Skeleton className="h-3 w-[150px] dark:bg-gray-500 " />
                    </div>
                  </div>
                ))}
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto py-1">
                {suggestions.map((adviser) => (
                  <li
                    key={adviser.id}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSuggestionClick(adviser)}
                  >
                    <div className="flex items-center">
                      <Avatar className="mr-3 h-8 w-8">
                        <AvatarImage src={adviser.avatar} alt={adviser.name} />
                        <AvatarFallback>
                          {adviser.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{adviser.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {adviser.profession} - {adviser.specialty}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : searchTerm && !isLoading ? (
              <div className="p-4 text-center text-gray-500">
                No se encontraron coincidencias
              </div>
            ) : null}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}

export default InputSearchAdviser
