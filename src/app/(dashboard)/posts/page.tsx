'use client'

import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CommentsSection } from '@/components/CommentsSection'
import { ShareDialog } from '@/components/ShareDialog'
import OptionsPost from '@/components/OptionsPost'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { cn } from '@/utils/tailwind'
import Image from 'next/image'
import React, { useId, useState } from 'react'
import { PostInput } from '@/components/InputPost'

type PostContent = {
  id: string
  title: string
  description: string
  images: string[]
  likes: number
  comments: Comment[]
  shares: number
  user: {
    name: string
    avatar: string
  }
  showComments?: boolean
}

type Comment = {
  id: string
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  replies: Reply[]
}

type Reply = {
  id: string
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
}

const postsContent: PostContent[] = [
  {
    id: '1',
    title: '¡Acabo de visitar este lugar increíble! 🌄',
    description: '1 hour ago',
    images: [
      'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=2070&auto=format&fit=crop',
    ],
    likes: 42,
    comments: [
      {
        id: 'c1',
        user: {
          name: 'María González',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        content: '¡Se ve espectacular! ¿Dónde es exactamente?',
        timestamp: '30 min ago',
        replies: [
          {
            id: 'r1',
            user: {
              name: 'ERNESTO ALONSO',
              avatar: 'https://github.com/shadcn.png',
            },
            content: 'Es en las montañas de Huaraz, Perú. ¡Muy recomendado!',
            timestamp: '25 min ago',
          },
        ],
      },
      {
        id: 'c2',
        user: {
          name: 'Carlos Pérez',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        content: 'Increíbles vistas 😍',
        timestamp: '15 min ago',
        replies: [],
      },
    ],
    shares: 3,
    user: {
      name: 'ERNESTO ALONSO',
      avatar: 'https://github.com/shadcn.png',
    },
  },
]

type CardProps = React.ComponentProps<typeof Card>

const PagePosts = ({ className, ...props }: CardProps) => {
  const [posts, setPosts] = useState<PostContent[]>(postsContent)
  const [likedStates, setLikedStates] = React.useState<Record<string, boolean>>(
    {},
  )
  const [likeCounts, setLikeCounts] = React.useState<Record<string, number>>(
    postsContent.reduce((acc, post) => ({ ...acc, [post.id]: post.likes }), {}),
  )

  const toggleComments = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post,
      ),
    )
  }

  const addComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: {
        name: 'Tú',
        avatar: 'https://github.com/shadcn.png',
      },
      content,
      timestamp: 'Just now',
      replies: [],
    }

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [newComment, ...post.comments] }
          : post,
      ),
    )
  }

  const addReply = (postId: string, commentId: string, content: string) => {
    const newReply: Reply = {
      id: `r${Date.now()}`,
      user: {
        name: 'Tú',
        avatar: 'https://github.com/shadcn.png',
      },
      content,
      timestamp: 'Just now',
    }

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, replies: [...comment.replies, newReply] }
                  : comment,
              ),
            }
          : post,
      ),
    )
  }

  const handleNewPost = (content: string, images: File[]) => {
    const imageUrls = images.map((file) => URL.createObjectURL(file))
    const newPost: PostContent = {
      id: useId(),
      title: content,
      description: 'Just now',
      images: imageUrls, // Usar las URLs generadas
      likes: 0,
      comments: [],
      shares: 0,
      user: {
        name: 'ERNESTO ALONSO',
        avatar: 'https://github.com/shadcn.png',
      },
    }
    setPosts([newPost, ...posts])
  }

  const handleLike = (postId: string) => {
    setLikedStates((prev) => {
      const isLiked = !prev[postId]
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [postId]: isLiked
          ? (prevCounts[postId] || 0) + 1
          : (prevCounts[postId] || 0) - 1,
      }))
      return { ...prev, [postId]: isLiked }
    })
  }

  return (
    <div className="w-full space-y-6">
      <PostInput
        user={{
          name: 'ERNESTO ALONSO',
          avatar: 'https://github.com/shadcn.png',
        }}
        onPostSubmit={handleNewPost}
      />
      {posts.map((post, index) => (
        <Card key={post.id} className={cn('w-full', className)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{post.user.name}</CardTitle>
                  <CardDescription>
                    {post.description} ·{' '}
                    <span className="text-blue-500">Público</span>
                  </CardDescription>
                </div>
              </div>
              <OptionsPost />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{post.title}</p>

            {post.images.length > 0 && (
              <div
                className={`grid gap-2 ${
                  post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                }`}
              >
                {post.images.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative aspect-video overflow-hidden rounded-lg"
                  >
                    <Image
                      src={img}
                      alt={`Post image ${imgIndex + 1}`}
                      fill
                      className="object-cover"
                      priority={imgIndex === 0}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                  <Heart className="h-3 w-3 fill-current" />
                </div>
                <span>{likeCounts[post.id]}</span>
              </div>
              <div className="ml-auto">
                <span>{post.comments.length} comentarios</span>
                <span className="mx-2">·</span>
                <span>{post.shares} compartidos</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t px-0 pb-0">
            <div className="grid w-full grid-cols-3">
              {/* Botón de Me gusta */}
              <Button
                variant="ghost"
                className={`rounded-none ${
                  likedStates[post.id] ? 'text-red-500' : ''
                }`}
                onClick={() => handleLike(post.id)}
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${
                    likedStates[post.id] ? 'fill-current' : ''
                  }`}
                />
                Me gusta
              </Button>

              {/* Botón de Comentar */}
              <Button
                variant="ghost"
                className="rounded-none"
                onClick={() => toggleComments(post.id)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Comentar
              </Button>

              {/* Nuevo botón de Compartir con ShareDialog */}
              <ShareDialog url={`https://tusitio.com/posts/${post.id}`} />
            </div>
          </CardFooter>
          {post.showComments && (
            <div className="px-6 pb-4">
              <CommentsSection
                comments={post.comments}
                onAddComment={(content) => addComment(post.id, content)}
                onAddReply={(commentId, content) =>
                  addReply(post.id, commentId, content)
                }
              />
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

export default PagePosts
