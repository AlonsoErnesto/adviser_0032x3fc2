'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ImageIcon,
  SmileIcon,
  MapPinIcon,
  UsersIcon,
  XIcon,
  PlusIcon,
} from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/hooks/use-toast'
import EmojiPicker from 'emoji-picker-react'
import { useTheme } from 'next-themes'

interface CreatePostDialogProps {
  user: {
    name: string
    avatar: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (content: string, images: File[]) => void
}

export function CreatePostDialog({
  user,
  open,
  onOpenChange,
  onSubmit,
}: CreatePostDialogProps) {
  const [content, setContent] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const emojiButtonRef = useRef<HTMLButtonElement>(null)
  const { toast } = useToast()

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        emojiButtonRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmojiPicker])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const updatedImages = [...images, ...newFiles]
      setImages(updatedImages)

      // Create previews for new files
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setImagePreviews([...imagePreviews, ...newPreviews])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newPreviews = [...imagePreviews]
    URL.revokeObjectURL(newPreviews[index])
    newPreviews.splice(index, 1)
    setImagePreviews(newPreviews)
  }

  const handleSubmit = () => {
    if (!content.trim() && images.length === 0) {
      toast({
        title: 'Error',
        description: 'El post no puede estar vacío',
        variant: 'destructive',
      })
      return
    }

    onSubmit(content, images)
    setContent('')
    setImages([])
    setImagePreviews([])
    onOpenChange(false)
  }

  const handleEmojiSelect = (emojiData: any) => {
    setContent((prev) => prev + emojiData.emoji)
    // No longer close the emoji picker automatically
  }

  // Helper function to determine grid layout based on number of images
  const getImageGridClassName = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-2'
      case 3:
        return 'grid-cols-3'
      case 4:
        return 'grid-cols-2 grid-rows-2'
      default:
        return 'grid-cols-3'
    }
  }

  // Helper function to determine image classes based on position and count
  const getImageClassName = (index: number, count: number) => {
    if (count === 1) {
      return 'h-80 w-full object-cover'
    }

    if (count === 2) {
      return 'h-64 w-full object-cover'
    }

    if (count === 3) {
      return 'h-48 w-full object-cover'
    }

    if (count === 4) {
      return 'h-40 w-full object-cover'
    }

    // For 5+ images
    if (index < 4) {
      return 'h-32 w-full object-cover'
    } else {
      return 'hidden'
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl" ref={dialogContentRef}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Crear publicación</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{user.name}</div>
                <div className="mb-2 text-xs text-muted-foreground">
                  Público
                </div>
                <Textarea
                  placeholder={`¿Qué estás pensando, ${
                    user.name.split(' ')[0]
                  }?`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[100px] border-0 text-base focus-visible:ring-0"
                  style={{
                    fontFamily:
                      "'Segoe UI Emoji', 'Segoe UI Symbol', 'Apple Color Emoji', sans-serif",
                  }}
                />
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="relative overflow-hidden rounded-lg">
                <div
                  className={`grid gap-1 ${getImageGridClassName(
                    imagePreviews.length,
                  )}`}
                >
                  {imagePreviews.slice(0, 4).map((preview, index) => (
                    <div key={index} className="group relative">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className={`rounded-md ${getImageClassName(
                          index,
                          imagePreviews.length,
                        )}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-black/50 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <XIcon className="h-4 w-4 text-white" />
                      </button>

                      {/* Showing count of remaining images */}
                      {index === 3 && imagePreviews.length > 4 && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/30 text-xl font-bold text-white">
                          +{imagePreviews.length - 4}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm font-medium">Añadir a tu publicación</div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-5 w-5 text-green-500" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  ref={emojiButtonRef}
                >
                  <SmileIcon className="h-5 w-5 text-yellow-500" />
                </Button>
                <Button variant="ghost" size="icon" type="button">
                  <MapPinIcon className="h-5 w-5 text-red-500" />
                </Button>
                <Button variant="ghost" size="icon" type="button">
                  <UsersIcon className="h-5 w-5 text-blue-500" />
                </Button>
              </div>
            </div>

            {showEmojiPicker && (
              <div
                className="relative z-50"
                ref={emojiPickerRef}
                style={{
                  position: 'absolute',
                  bottom: '120px',
                  right: '20px',
                }}
              >
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                  style={{
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '350px',
                    maxHeight: '400px',
                  }}
                />
              </div>
            )}

            <Button
              className="w-full font-bold"
              disabled={!content.trim() && images.length === 0}
              onClick={handleSubmit}
            >
              Publicar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
