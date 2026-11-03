import { ArrowUpRight } from 'lucide-react'
import { Reveal, StaggerItem } from '../components/Reveal'
import { Section } from '../components/Section'
import { achievements } from '../data/content'
import styles from './Achievements.module.css'

export function Achievements() {
  return (
    <Section id="achievements" index={7} label="Achievements" title="Achievements">
      <Reveal as="ul" className={styles.grid} stagger={0.1}>
        {achievements.map((a, i) => (
          <StaggerItem as="li" key={a.title} className={styles.card}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className={styles.title}>{a.title}</h3>
            <p className={styles.detail}>{a.detail}</p>
            {a.link && (
              <a className={styles.link} href={a.link.href} target="_blank" rel="noopener">
                {a.link.label}
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            )}
          </StaggerItem>
        ))}
      </Reveal>
    </Section>
  )
}
