'use client'
import ThemeToggle from '@/components/ThemeToggle'
import { UserButton, useUser } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import {
  Bell,
  Bookmark,
  GraduationCap,
  HelpCircle,
  HomeIcon,
  LayoutDashboard,
  MessageCircle,
  MessageCircleQuestion,
  Settings,
  User,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/tailwind'

const ProfileLeftSection = ({ onLoad }: { onLoad?: () => void }) => {
  const { user } = useUser()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    onLoad?.()
  }, [onLoad])

  if (!user) return null

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const navItems = [
    {
      href: '/posts',
      icon: <HomeIcon size={20} />,
      label: 'Inicio',
      active: pathname === '/posts',
    },
    {
      href: '/profile',
      icon: <User size={20} />,
      label: 'Perfil',
      active: pathname.startsWith('/profile'),
    },
    {
      href: '/advisers',
      icon: <GraduationCap size={20} />,
      label: 'Asesores',
      active: pathname.startsWith('/advisers'),
    },

    {
      href: '/platform',
      icon: <LayoutDashboard size={20} />,
      label: 'Plataforma',
      active: pathname.startsWith('/platform'),
    },
    {
      href: '/messages',
      icon: <MessageCircle size={20} />,
      label: 'Mensajes',
      active: pathname.startsWith('/messages'),
    },
    {
      href: '/saved',
      icon: <Bookmark size={20} />,
      label: 'Guardados',
      active: pathname.startsWith('/saved'),
    },
  ]

  const bottomNavItems = [
    {
      href: '/feedback',
      icon: <MessageCircleQuestion size={20} />,
      label: 'Feedback',
      active: pathname.startsWith('/feedback'),
    },
    {
      href: '/notifications',
      icon: <Bell size={20} />,
      label: 'Notificaciones',
      active: pathname.startsWith('/notifications'),
    },
    {
      href: '/help',
      icon: <HelpCircle size={20} />,
      label: 'Ayuda',
      active: pathname.startsWith('/help'),
    },
    {
      href: '/settings',
      icon: <Settings size={20} />,
      label: 'Configuración',
      active: pathname.startsWith('/settings'),
    },
  ]

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r border-gray-200 bg-white pb-3 pt-5 dark:border-gray-800 dark:bg-gray-950',
        'overflow-hidden', // Elimina el scroll
        isCollapsed ? 'w-[80px] items-center' : 'w-[250px]',
      )}
    >
      {!isMobile && (
        <button
          onClick={toggleCollapse}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          )}
        </button>
      )}
      <div className="flex items-center gap-3 px-4 py-2">
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-10 h-10',
              userButtonTrigger: 'focus:shadow-none',
            },
          }}
        />

        {!isCollapsed && (
          <div
            className="cursor-pointer overflow-hidden"
            onClick={() => (window.location.href = '/profile')}
          >
            <p className="truncate text-sm font-medium dark:text-white">
              {user.fullName}
            </p>
            <p className="truncate text-xs text-gray-600 dark:text-gray-400">
              @{user.primaryEmailAddress?.emailAddress.split('@')[0]}
            </p>
          </div>
        )}
      </div>
      <Separator className="my-2 w-[90%] self-center" />
      <NavigationMenu className="flex flex-col space-y-1 px-2">
        <NavigationMenuList className="flex w-full flex-col space-y-1">
          {navItems.map(({ href, icon, label, active }) => (
            <NavigationMenuItem key={href} className="w-full">
              <Link
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-md p-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800',
                  active
                    ? 'bg-gray-100 font-medium text-sky-600 dark:bg-gray-800 dark:text-sky-400'
                    : 'text-gray-700 dark:text-gray-300',
                  isCollapsed ? 'justify-center' : 'px-3',
                )}
              >
                <span
                  className={active ? 'text-sky-600 dark:text-sky-400' : ''}
                >
                  {icon}
                </span>
                {!isCollapsed && <span>{label}</span>}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Separator className="my-2 w-[90%] self-center" />
      <NavigationMenu className="flex flex-col space-y-1 px-2">
        <NavigationMenuList className="flex w-full flex-col space-y-1">
          {bottomNavItems.map(({ href, icon, label, active }) => (
            <NavigationMenuItem key={href} className="w-full">
              <Link
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-md p-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800',
                  active
                    ? 'bg-gray-100 font-medium text-sky-600 dark:bg-gray-800 dark:text-sky-400'
                    : 'text-gray-700 dark:text-gray-300',
                  isCollapsed ? 'justify-center' : 'px-3',
                )}
              >
                <span
                  className={active ? 'text-sky-600 dark:text-sky-400' : ''}
                >
                  {icon}
                </span>
                {!isCollapsed && <span>{label}</span>}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex-1"></div>{' '}
      <Separator className="my-2 w-[90%] self-center" />
      <div
        className={cn(
          'flex w-[90%] items-center self-center px-2 py-2',
          isCollapsed ? 'justify-center' : 'justify-between',
        )}
      >
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="flex items-center gap-2 rounded-md p-1 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            {!isCollapsed && 'Minimizar'}
          </button>
        )}
        <ThemeToggle />
      </div>
    </div>
  )
}

export default ProfileLeftSection
