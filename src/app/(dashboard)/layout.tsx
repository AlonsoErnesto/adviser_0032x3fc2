import ProfileLeftSection from '@/components/profile-left'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <div className="flex min-h-screen">
        <div className="sticky top-0 h-screen overflow-y-auto pl-[3%]">
          <ProfileLeftSection />
        </div>
        <div className="flex-1 overflow-y-auto ">
          <div className="mx-auto max-w-5xl  py-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
