import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Asesor no encontrado</h2>
      <p>El perfil solicitado no existe o ha sido eliminado</p>
      <Button asChild>
        <Link href="/advisers">Volver a la lista de asesores</Link>
      </Button>
    </div>
  )
}
