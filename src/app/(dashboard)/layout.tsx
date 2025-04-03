'use client'
import { useState } from 'react'
import ProfileLeftSection from '@/components/profile-left'
import { Spinner } from '@/components/ui/spinner'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [leftSectionLoaded, setLeftSectionLoaded] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {' '}
      <div className="sticky top-0 h-full">
        {' '}
        <ProfileLeftSection onLoad={() => setLeftSectionLoaded(true)} />
      </div>
      {leftSectionLoaded ? (
        <div className="flex-1 overflow-y-auto">
          {' '}
          <div className="mx-auto max-w-5xl px-4 py-10">{children}</div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <Spinner className="h-12 w-12" />
        </div>
      )}
    </div>
  )
}
