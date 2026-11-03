import { Reveal, StaggerItem } from '../components/Reveal'
import { Section } from '../components/Section'
import { education } from '../data/content'
import styles from './Education.module.css'

export function Education() {
  return (
    <Section id="education" index={6} label="Education" title="Education">
      <Reveal as="ol" className={styles.list} stagger={0.08}>
        {education.map((e) => (
          <StaggerItem as="li" key={e.school} className={styles.row}>
            <span className={styles.when}>
              {e.start} — <span className={e.end === 'Present' ? styles.present : undefined}>{e.end}</span>
            </span>
            <div className={styles.main}>
              <h3 className={styles.school}>{e.school}</h3>
              <p className={styles.degree}>{e.degree}</p>
            </div>
            <span className={styles.place}>{e.place}</span>
            <span className={styles.score}>{e.score ?? ''}</span>
          </StaggerItem>
        ))}
      </Reveal>
    </Section>
  )
}
