import logo from '../assets/arindom-logo.png?w=72&format=png'
import { m } from 'motion/react'
import { FileText, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navSections, profile, sections } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToId } from '../hooks/useSmoothScroll'
import { openPalette } from './PaletteLauncher'
import styles from './Nav.module.css'

// 'top' is included so the underline clears when the hero is in view.
const allIds = ['top', ...sections.map((s) => s.id)]
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export function Nav() {
  const active = useActiveSection(allIds)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.wrap} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.pill} aria-label="Primary">
        <a
          href="#top"
          className={styles.mark}
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
          aria-label={`${profile.name}, back to top`}
        >
          <img src={logo} alt="" width={36} height={36} />
        </a>

        <ul className={styles.links}>
          {navSections.map((id) => {
            const label = sections.find((s) => s.id === id)?.label ?? id
            const isActive = active === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(id)
                  }}
                >
                  {label}
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      className={styles.indicator}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <button type="button" className={styles.kbd} onClick={openPalette} aria-label="Open command palette">
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </button>

        <button type="button" className={styles.menu} onClick={openPalette} aria-label="Open menu">
          <Menu size={18} strokeWidth={1.5} />
        </button>

        <a className={styles.cv} href={profile.links.cv} target="_blank" rel="noopener">
          <FileText size={15} strokeWidth={1.5} aria-hidden="true" />
          CV
        </a>
      </nav>
    </header>
  )
}
