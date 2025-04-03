import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'

export default function PostCard({ post, user }: { post: any; user: any }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img
              src={user.avatar}
              alt="Perfil"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium dark:text-white">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.date}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </div>
      <p className="mt-3 text-gray-800 dark:text-gray-200">{post.content}</p>
      {post.images.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-lg">
          <img
            src={post.images[0]}
            alt="Publicación"
            className="w-full object-cover"
          />
        </div>
      )}
      <div className="mt-3 flex items-center justify-between text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <ThumbsUp size={16} className="text-blue-500" />
          <span>{post.likes}</span>
        </div>
        <div>
          <span>{post.comments} comentarios</span>
          <span className="mx-2">·</span>
          <span>{post.shares} compartidos</span>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between">
        <Button variant="ghost" className="flex-1 gap-2">
          <ThumbsUp size={16} />
          <span>Me gusta</span>
        </Button>
        <Button variant="ghost" className="flex-1 gap-2">
          <MessageCircle size={16} />
          <span>Comentar</span>
        </Button>
        <Button variant="ghost" className="flex-1 gap-2">
          <Share2 size={16} />
          <span>Compartir</span>
        </Button>
      </div>
    </div>
  )
}
