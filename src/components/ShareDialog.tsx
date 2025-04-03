'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Share2, Link, MessageSquare, Facebook, Instagram } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/hooks/use-toast'

export function ShareDialog({ url }: { url: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast({
      title: '¡Enlace copiado!',
      description: 'El enlace se ha copiado al portapapeles',
    })
  }

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank')
  }

  const shareOnMessenger = () => {
    window.open(
      `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
        url,
      )}&app_id=YOUR_APP_ID`,
      '_blank',
    )
  }

  const shareOnInstagram = () => {
    // Nota: Instagram no permite compartir directamente desde web
    // Esto abrirá la app si está instalada o la web
    window.open(
      `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
      '_blank',
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Compartir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartir publicación</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Input value={url} readOnly />
            <Button onClick={copyToClipboard} size="sm" className="px-3">
              <Link className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={shareOnWhatsApp}
              className="flex h-auto flex-col items-center py-4"
            >
              <MessageSquare className="mb-2 h-6 w-6 text-green-500" />
              <span>WhatsApp</span>
            </Button>

            <Button
              variant="outline"
              onClick={shareOnMessenger}
              className="flex h-auto flex-col items-center py-4"
            >
              <Facebook className="mb-2 h-6 w-6 text-blue-500" />
              <span>Messenger</span>
            </Button>

            <Button
              variant="outline"
              onClick={shareOnInstagram}
              className="flex h-auto flex-col items-center py-4"
            >
              <Instagram className="mb-2 h-6 w-6 text-pink-500" />
              <span>Instagram</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
