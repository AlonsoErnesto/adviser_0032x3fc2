'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ImageIcon, SmileIcon, MapPinIcon, UsersIcon } from 'lucide-react'
import { CreatePostDialog } from './CreatePostDialog'

interface PostInputProps {
  user: {
    name: string
    avatar: string
  }
  onPostSubmit: (content: string) => void
}

export function PostInput({ user, onPostSubmit }: PostInputProps) {
  const [postContent, setPostContent] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (postContent.trim()) {
      onPostSubmit(postContent)
      setPostContent('')
    }
  }

  return (
    <>
      <Card className="mb-6 rounded-3xl">
        <CardHeader className="pb-3">
          <div
            className="flex items-center space-x-3"
            onClick={() => setOpen(true)}
          >
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <form onSubmit={handleSubmit} className="flex-1">
              <Input
                placeholder={`¿Qué estás pensando, ${user.name.split(' ')[0]}?`}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="rounded-full bg-muted hover:bg-muted/80 focus-visible:ring-0"
              />
            </form>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-between border-t pt-3">
            <Button variant="ghost" className="flex-1 text-muted-foreground">
              <ImageIcon className="mr-2 h-5 w-5 text-green-500" />
              Foto/video
            </Button>
            <Button variant="ghost" className="flex-1 text-muted-foreground">
              <SmileIcon className="mr-2 h-5 w-5 text-yellow-500" />
              Sentimiento
            </Button>
            <Button variant="ghost" className="flex-1 text-muted-foreground">
              <MapPinIcon className="mr-2 h-5 w-5 text-red-500" />
              Check-in
            </Button>
            <Button variant="ghost" className="flex-1 text-muted-foreground">
              <UsersIcon className="mr-2 h-5 w-5 text-blue-500" />
              Etiquetar amigos
            </Button>
          </div>
        </CardContent>
      </Card>
      <CreatePostDialog
        user={user}
        open={open}
        onOpenChange={setOpen}
        onSubmit={onPostSubmit}
      />
    </>
  )
}
