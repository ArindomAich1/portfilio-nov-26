import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis: Lenis | null = null

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Gentle inertial scrolling on pointer devices; native scrolling for touch and reduced motion. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3), smoothWheel: true })
    let frame = requestAnimationFrame(function raf(time) {
      lenis?.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

/** Scrolls to a section by id, using Lenis when it is running. */
export function scrollToId(id: string) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return

  if (lenis) {
    lenis.scrollTo(target, { offset: id === 'top' ? 0 : -88 })
  } else if (typeof target === 'number') {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  if (id !== 'top') history.replaceState(null, '', `#${id}`)
  else history.replaceState(null, '', location.pathname)
}
