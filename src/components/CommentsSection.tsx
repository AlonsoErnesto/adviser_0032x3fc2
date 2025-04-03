'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SmileIcon, SendHorizonalIcon } from 'lucide-react'
import { useState } from 'react'

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  replies: Reply[]
}

interface Reply {
  id: string
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
}

interface CommentsSectionProps {
  comments: Comment[]
  onAddComment: (content: string) => void
  onAddReply: (commentId: string, content: string) => void
}

export function CommentsSection({
  comments,
  onAddComment,
  onAddReply,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment('')
    }
  }

  const handleSubmitReply = (commentId: string) => {
    if (replyContent.trim()) {
      onAddReply(commentId, replyContent)
      setReplyContent('')
      setReplyingTo(null)
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <form
        onSubmit={handleSubmitComment}
        className="flex items-start space-x-2"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>EA</AvatarFallback>
        </Avatar>
        <div className="relative flex-1">
          <Input
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-8 w-8"
          >
            <SmileIcon className="h-4 w-4" />
          </Button>
        </div>
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          disabled={!newComment.trim()}
        >
          <SendHorizonalIcon className="h-4 w-4" />
        </Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="rounded-lg bg-muted p-3">
                  <div className="font-medium">{comment.user.name}</div>
                  <p className="text-sm">{comment.content}</p>
                </div>
                <div className="mt-1 flex space-x-3 text-xs text-muted-foreground">
                  <button className="hover:underline">Me gusta</button>
                  <button
                    className="hover:underline"
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id,
                      )
                    }
                  >
                    Responder
                  </button>
                  <span>{comment.timestamp}</span>
                </div>

                {replyingTo === comment.id && (
                  <div className="mt-2 flex items-start space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>EA</AvatarFallback>
                    </Avatar>
                    <div className="relative flex-1">
                      <Input
                        placeholder="Escribe una respuesta..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="h-8 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-8 w-8"
                      >
                        <SmileIcon className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyContent.trim()}
                    >
                      <SendHorizonalIcon className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                {comment.replies.length > 0 && (
                  <div className="mt-2 space-y-2 border-l-2 border-muted pl-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reply.user.avatar} />
                          <AvatarFallback>
                            {reply.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="rounded-lg bg-muted p-2">
                            <div className="text-xs font-medium">
                              {reply.user.name}
                            </div>
                            <p className="text-xs">{reply.content}</p>
                          </div>
                          <div className="mt-1 flex space-x-2 text-xs text-muted-foreground">
                            <button className="hover:underline">
                              Me gusta
                            </button>
                            <span>{reply.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
