import { Reveal, StaggerItem } from '../components/Reveal'
import { Section } from '../components/Section'
import { TagList } from '../components/ui'
import { skills } from '../data/content'
import styles from './Skills.module.css'

export function Skills() {
  return (
    <Section id="skills" index={5} label="Skills" title="Skills">
      <Reveal as="ul" className={styles.groups} stagger={0.07}>
        {skills.map((group) => (
          <StaggerItem as="li" key={group.label} className={styles.group}>
            <h3 className={styles.label}>{group.label}</h3>
            <TagList items={group.items} label={group.label} />
          </StaggerItem>
        ))}
      </Reveal>
    </Section>
  )
}
