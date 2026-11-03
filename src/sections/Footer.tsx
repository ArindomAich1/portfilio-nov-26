import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content'
import { useLocalTime } from '../hooks/useLocalTime'
import { scrollToId } from '../hooks/useSmoothScroll'
import styles from './Footer.module.css'

const updated = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(new Date(__BUILD_DATE__))

export function Footer() {
  const time = useLocalTime(profile.timeZone)

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.sign}>{profile.name}</p>
        <div className={styles.meta}>
          <span>© {new Date().getFullYear()}</span>
          <span>
            Kharagpur · <time>{time}</time> IST
          </span>
          <span>{profile.coords}</span>
          <span>Updated {updated}</span>
        </div>
        <button type="button" className={styles.top} onClick={() => scrollToId('top')}>
          Back to top <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
