// app/api/clerk-webhook/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { createServiceRoleClient } from '@/lib/supabase-server'
import type { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const payload = await req.json()
  const svixId = headers().get('svix-id')
  const svixSignature = headers().get('svix-signature')
  const svixTimestamp = headers().get('svix-timestamp')

  if (!svixId || !svixSignature || !svixTimestamp) {
    return new Response('Error de autenticación', { status: 400 })
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)
  let event: WebhookEvent

  try {
    event = wh.verify(JSON.stringify(payload), {
      'svix-id': svixId,
      'svix-signature': svixSignature,
      'svix-timestamp': svixTimestamp,
    }) as WebhookEvent
  } catch (err) {
    return new Response('Firma inválida', { status: 400 })
  }

  const supabase = createServiceRoleClient()

  try {
    switch (event.type) {
      case 'user.created':
        const { id, first_name, last_name, image_url, email_addresses } =
          event.data

        await supabase.from('profiles').upsert({
          user_id: id,
          full_name: `${first_name} ${last_name}`.trim(),
          avatar_url: image_url,
          email: email_addresses[0]?.email_address,
        })
        break

      case 'user.updated':
        // Maneja actualizaciones de perfil
        break

      case 'user.deleted':
        // Maneja eliminación de usuario
        break
    }

    return new Response('Success', { status: 200 })
  } catch (error) {
    console.error('Error en webhook:', error)
    return new Response('Server error', { status: 500 })
  }
}
