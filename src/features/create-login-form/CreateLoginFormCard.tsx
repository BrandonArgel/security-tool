'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { savedLoginSchema, SavedLoginValues } from '@/lib/schemas'
import { createSavedLogin } from '@/actions/save-login'
// Si tienes componentes UI reutilizables, impórtalos aquí (Button, Input, etc.)

export const CreateLoginFormCard = () => {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  // 1. Configurar el formulario
  const form = useForm<SavedLoginValues>({
    resolver: zodResolver(savedLoginSchema),
    defaultValues: {
      siteName: '',
      url: '',
      username: '',
      password: ''
    }
  })

  // 2. Manejar el envío
  const onSubmit = (values: SavedLoginValues) => {
    setMessage(null) // Limpiar mensajes previos

    // startTransition envuelve la llamada al servidor
    startTransition(async () => {
      const result = await createSavedLogin(values)

      if (result.error) {
        setMessage(`❌ Error: ${result.error}`)
      } else {
        setMessage('✅ ¡Guardado exitosamente!')
        form.reset() // Limpiar formulario
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md border p-4 rounded-lg bg-card">
      <h2 className="text-xl font-bold mb-4">Guardar nueva contraseña</h2>

      {/* Campo: Nombre del sitio */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Nombre del sitio (Opcional)</label>
        <input
          {...form.register('siteName')}
          placeholder="Ej. Netflix Personal"
          className="border p-2 rounded-md bg-background"
          disabled={isPending}
        />
      </div>

      {/* Campo: URL */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">URL</label>
        <input
          {...form.register('url')}
          placeholder="https://..."
          className="border p-2 rounded-md bg-background"
          disabled={isPending}
        />
        {form.formState.errors.url && <span className="text-red-500 text-xs">{form.formState.errors.url.message}</span>}
      </div>

      {/* Campo: Usuario */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Usuario / Email</label>
        <input
          {...form.register('username')}
          placeholder="user@example.com"
          className="border p-2 rounded-md bg-background"
          disabled={isPending}
        />
        {form.formState.errors.username && (
          <span className="text-red-500 text-xs">{form.formState.errors.username.message}</span>
        )}
      </div>

      {/* Campo: Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Contraseña</label>
        <input
          type="password"
          {...form.register('password')}
          className="border p-2 rounded-md bg-background"
          disabled={isPending}
        />
        {form.formState.errors.password && (
          <span className="text-red-500 text-xs">{form.formState.errors.password.message}</span>
        )}
      </div>

      {/* Mensajes de error/éxito globales */}
      {message && <p className="text-sm font-medium">{message}</p>}

      {/* Botón de Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50 w-full"
      >
        {isPending ? 'Guardando...' : 'Guardar Credencial'}
      </button>
    </form>
  )
}
