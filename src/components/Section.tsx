import { m } from 'motion/react'
import type { ReactNode } from 'react'
import styles from './Section.module.css'

type Props = {
  id: string
  index: number
  label: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
}

const ease = [0.22, 1, 0.36, 1] as const

/** Page section: sticky mono rail (§ index + label) beside a serif title with a self-drawing hairline. */
export function Section({ id, index, label, title, intro, children }: Props) {
  const num = String(index).padStart(2, '0')

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.rail} aria-hidden="true">
          <div className={styles.railInner}>
            <span className={styles.index}>§ {num}</span>
            <span className={styles.label}>{label}</span>
          </div>
        </div>

        <div className={styles.body}>
          <header className={styles.header}>
            <span className={styles.inlineIndex} aria-hidden="true">
              § {num} — {label}
            </span>
            <m.h2
              id={`${id}-title`}
              className={styles.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease }}
            >
              {title}
            </m.h2>
            <m.span
              className={styles.hairline}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.2, ease, delay: 0.15 }}
              aria-hidden="true"
            />
            {intro && (
              <m.p
                className={styles.intro}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
              >
                {intro}
              </m.p>
            )}
          </header>
          {children}
        </div>
      </div>
    </section>
  )
}
