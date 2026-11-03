import { Reveal, StaggerItem } from '../components/Reveal'
import { Section } from '../components/Section'
import { facts, profile } from '../data/content'
import styles from './About.module.css'

export function About() {
  return (
    <Section id="about" index={1} label="About" title="About">
      <div className={styles.layout}>
        <Reveal className={styles.summary} stagger={0.12}>
          {profile.summary.map((para) => (
            <StaggerItem as="p" key={para.slice(0, 24)}>
              {para}
            </StaggerItem>
          ))}
        </Reveal>

        <Reveal as="ul" className={styles.facts} stagger={0.08} delay={0.1}>
          {facts.map((fact) => (
            <StaggerItem as="li" key={fact.label} className={styles.fact}>
              <span className={styles.value}>{fact.value}</span>
              <span className={styles.label}>{fact.label}</span>
            </StaggerItem>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
