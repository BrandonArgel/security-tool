'use client'

import { useState, useTransition } from 'react'
import { revealPassword } from '@/actions/reveal-password'
// Importa tus iconos si usas lucide-react o heroicons, aquí usaré texto simple por ahora

type LoginItemProps = {
  id: string
  siteName?: string | null
  username: string
  url: string
}

// Componente individual para manejar el estado de cada fila
const LoginItem = ({ data }: { data: LoginItemProps }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [password, setPassword] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    if (isVisible) {
      // Si ya se ve, la ocultamos
      setIsVisible(false)
      return
    }

    // Si ya la pedimos antes, solo la mostramos (ahorra peticiones)
    if (password) {
      setIsVisible(true)
      return
    }

    // Si no la tenemos, vamos al servidor
    startTransition(async () => {
      const result = await revealPassword(data.id)
      if (result.password) {
        setPassword(result.password)
        setIsVisible(true)
      } else {
        alert('Error: ' + result.error)
      }
    })
  }

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      alert('¡Copiada al portapapeles!')
    }
  }

  return (
    <div className="border rounded-lg p-4 mb-3 flex justify-between items-center bg-card shadow-sm">
      <div className="overflow-hidden">
        <h3 className="font-bold text-lg">{data.siteName || data.url}</h3>
        <p className="text-gray-500 text-sm">{data.username}</p>
        <a href={data.url} target="_blank" className="text-blue-500 text-xs hover:underline truncate block">
          {data.url}
        </a>
      </div>

      <div className="flex flex-col items-end gap-2 min-w-[150px]">
        {/* Área de la contraseña */}
        <div className="font-mono bg-gray-100 px-2 py-1 rounded text-sm h-8 flex items-center min-w-[120px] justify-center">
          {isPending ? (
            <span className="text-xs text-gray-400">Desencriptando...</span>
          ) : isVisible && password ? (
            <span className="text-surface">{password}</span>
          ) : (
            <span className="text-gray-400">••••••••••</span>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            onClick={handleToggle}
            className="text-xs bg-secondary px-3 py-1 rounded border hover:bg-gray-100 transition"
          >
            {isVisible ? 'Ocultar' : 'Ver'}
          </button>

          {isVisible && (
            <button
              onClick={handleCopy}
              className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
            >
              Copiar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente Lista Principal
export const LoginList = ({ logins }: { logins: LoginItemProps[] }) => {
  if (logins.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No hay contraseñas guardadas aún.</p>
  }

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mis Contraseñas</h2>
      <div className="flex flex-col gap-2">
        {logins.map((login) => (
          <LoginItem key={login.id} data={login} />
        ))}
      </div>
    </div>
  )
}
