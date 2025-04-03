'use client'
import ThemeToggle from '@/components/ThemeToggle'
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex w-[70%] items-center justify-center bg-red-900">
        <span className="text-2xl font-bold text-white">Image</span>
      </div>
      <div className="flex w-[30%] items-center justify-center ">
        <SignedOut>
          <SignIn
            afterSignInUrl="/posts"
            appearance={{
              elements: {
                card: ' shadow-lg rounded-lg p-6 border-10 border-gray-200',
                headerTitle: 'text-2xl font-bold text-gray-800',
                headerSubtitle: 'text-sm text-gray-600',
                socialButtonsBlockButton:
                  'bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg p-2',
                formButtonPrimary:
                  'bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg p-2',
                formFieldInput:
                  'border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500',
                footer: 'hidden',
              },
            }}
          />
        </SignedOut>
      </div>
      <div className="flex flex-1 justify-end  p-7">
        <ThemeToggle />
      </div>
    </div>
  )
}
