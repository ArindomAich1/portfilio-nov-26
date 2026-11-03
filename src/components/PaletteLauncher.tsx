import { lazy, Suspense, useEffect, useState } from 'react'

const CommandPalette = lazy(() => import('./CommandPalette'))

const OPEN_EVENT = 'palette:open'

export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT))

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

/** Owns the palette's open state and shortcuts; the palette itself (cmdk + dialog) loads on first open. */
export function PaletteLauncher() {
  const [open, setOpen] = useState(false)
  const [requested, setRequested] = useState(false)

  useEffect(() => {
    const show = () => {
      setRequested(true)
      setOpen(true)
    }
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setRequested(true)
        setOpen((o) => !o)
      } else if (e.key === '/' && !isTyping(e.target)) {
        e.preventDefault()
        show()
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_EVENT, show)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_EVENT, show)
    }
  }, [])

  if (!requested) return null

  return (
    <Suspense fallback={null}>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </Suspense>
  )
}
