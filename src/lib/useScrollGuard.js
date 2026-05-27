import { useRef, useCallback } from 'react'

// Prevents click events from firing when the user was scrolling.
// Usage: const { onPointerDown, onClick } = useScrollGuard(realOnClick)
// Attach onPointerDown and onClick to the element.
const THRESHOLD = 8 // px — finger must move less than this to count as a tap

export const useScrollGuard = (handler) => {
  const start = useRef(null)

  const onPointerDown = useCallback((e) => {
    start.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onClick = useCallback((e) => {
    if (!start.current) return
    const dx = Math.abs(e.clientX - start.current.x)
    const dy = Math.abs(e.clientY - start.current.y)
    start.current = null
    if (dx > THRESHOLD || dy > THRESHOLD) {
      e.stopPropagation()
      return
    }
    handler?.(e)
  }, [handler])

  return { onPointerDown, onClick }
}
