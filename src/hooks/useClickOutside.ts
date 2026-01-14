import type { RefObject } from 'react'
import { useEventListener } from '@/hooks'

type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'focusin' | 'focusout'

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null> | RefObject<T | null>[],
  handler: (_event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: EventType = 'mousedown',
  eventListenerOptions: AddEventListenerOptions = {}
): void => {
  useEventListener(
    eventType,
    (event: MouseEvent | TouchEvent | FocusEvent) => {
      const target = event.target as Node | null

      if (!target || !target.isConnected) {
        return
      }

      const isOutside = Array.isArray(ref)
        ? ref.filter(r => Boolean(r.current)).every(r => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target)

      if (isOutside) {
        handler(event)
      }
    },
    undefined,
    eventListenerOptions
  )
}
