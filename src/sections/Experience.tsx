import { ArrowUpRight } from 'lucide-react'
import { m, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { LiveDot, TagList } from '../components/ui'
import { experience } from '../data/content'
import styles from './Experience.module.css'

// Motion interpolates concrete colours, not CSS variables; these mirror tokens.css.
const PAPER = '#f7f5f0'
const RULE = '#c4beb0'
const ACCENT = '#1f3a93'

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <Section id="experience" index={3} label="Experience" title="Experience">
      <div className={styles.timeline}>
        <span className={styles.track} aria-hidden="true">
          <m.span className={styles.progress} style={{ scaleY: progress }} />
        </span>

        <ol ref={listRef} className={styles.roles}>
          {experience.map((role) => (
            <li key={`${role.org}-${role.title}`} className={styles.role}>
              <Reveal className={styles.when}>
                <span>{role.start}</span>
                <span className={styles.dash} aria-hidden="true">
                  —
                </span>
                <span>{role.end}</span>
              </Reveal>

              <m.span
                className={styles.node}
                initial={{ backgroundColor: PAPER, borderColor: RULE }}
                whileInView={{ backgroundColor: ACCENT, borderColor: ACCENT }}
                viewport={{ once: true, margin: '0px 0px -40% 0px' }}
                transition={{ duration: 0.4 }}
                aria-hidden="true"
              />

              <Reveal className={styles.body} delay={0.05}>
                <h3 className={styles.title}>
                  {role.title}
                  {role.current && (
                    <span className={styles.now}>
                      <LiveDot /> Now
                    </span>
                  )}
                </h3>
                <p className={styles.org}>
                  {role.org}
                  {role.place && <span className={styles.place}>{role.place}</span>}
                </p>

                {role.summary && <p className={styles.summary}>{role.summary}</p>}

                {role.bullets.length > 0 && (
                  <ul className={styles.bullets}>
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}

                {role.projects && (
                  <p className={styles.projects}>
                    <span className={styles.projectsLabel}>Projects</span>
                    {role.projects.join(' · ')}
                  </p>
                )}

                {role.stack && (
                  <div className={styles.stack}>
                    <TagList items={role.stack} label={`${role.title} stack`} />
                  </div>
                )}

                {role.certificate && (
                  <a className={styles.certificate} href={role.certificate.href} target="_blank" rel="noopener">
                    {role.certificate.label}
                    <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
