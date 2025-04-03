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
  GraduationCap,
  HomeIcon,
  LayoutDashboard,
  MessageCircle,
  MessageCircleQuestion,
  Settings,
} from 'lucide-react'

const ProfileLeftSection = () => {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="flex h-[100dvh] w-full flex-col  pb-3 pt-5">
      <div className="grow-2 flex items-center gap-3">
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-12 h-12',
              userButtonTrigger: 'focus:shadow-lg',
            },
          }}
        />
        <div>
          <p className="font-medium">{user.fullName}</p>
          <p className="text-sm text-gray-600">
            @ {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
      <Separator className="grow-1 my-3 w-[90%]" />
      <NavigationMenu className="grow-6 flex items-start ">
        <NavigationMenuList className="flex w-full flex-col items-start space-y-1 ">
          {[
            {
              href: '/posts',
              icon: <HomeIcon />,
              label: 'Posts',
              class: 'pl-4',
            },
            { href: '/advisers', icon: <GraduationCap />, label: 'Advisers' },
            { href: '/platform', icon: <LayoutDashboard />, label: 'Platform' },
            { href: '/messages', icon: <MessageCircle />, label: 'Messages' },
            {
              href: '/feedback',
              icon: <MessageCircleQuestion />,
              label: 'Feedback',
            },
            { href: '/settings', icon: <Settings />, label: 'Settings' },
          ].map(({ href, icon, label, class: className }) => (
            <NavigationMenuItem key={href}>
              <Link
                href={href}
                className={
                  `dark:hover:bg-gray-802 flex  w-[300px] gap-2  rounded-md  p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800  ` +
                  className
                }
              >
                {icon}
                <span>{label}</span>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Separator className="my-3 w-[90%]" />
      <div className="grow-1 flex w-[90%] items-center justify-end">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default ProfileLeftSection
