import { ArrowUpRight } from 'lucide-react'
import { PipelineStrip } from '../components/PipelineStrip'
import { Reveal, StaggerItem } from '../components/Reveal'
import { Section } from '../components/Section'
import { TagList } from '../components/ui'
import { minorProjects, projects } from '../data/content'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <Section
      id="projects"
      index={4}
      label="Projects"
      title="Projects"
    >
      <div className={styles.featured}>
        {projects.map((project, i) => (
          <article key={project.name} className={styles.project}>
            <Reveal className={styles.head}>
              <span className={styles.num}>P—{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.domain}>{project.domain}</span>
            </Reveal>

            <Reveal className={styles.titleRow} delay={0.05}>
              <h3 className={styles.name}>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noopener" className={styles.nameLink}>
                    {project.name}
                    <ArrowUpRight size={20} strokeWidth={1.25} aria-hidden="true" />
                  </a>
                ) : (
                  project.name
                )}
              </h3>
              <p className={styles.tagline}>{project.tagline}</p>
            </Reveal>

            <Reveal className={styles.diagram} delay={0.1}>
              <span className={styles.diagramLabel}>
                <span>key components</span>
              </span>
              <PipelineStrip nodes={project.pipeline} label={`${project.name} key components`} />
            </Reveal>

            <div className={styles.details}>
              <Reveal as="ul" className={styles.bullets} stagger={0.06}>
                {project.bullets.map((b) => (
                  <StaggerItem as="li" key={b}>
                    {b}
                  </StaggerItem>
                ))}
              </Reveal>
              <Reveal className={styles.stack} delay={0.1}>
                <span className={styles.stackLabel}>Stack</span>
                <TagList items={project.stack} label={`${project.name} stack`} />
              </Reveal>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.more}>
        <Reveal as="p" className={styles.moreLabel}>
          More work
        </Reveal>
        <Reveal as="ul" className={styles.minor} stagger={0.08}>
          {minorProjects.map((p) => (
            <StaggerItem as="li" key={p.name} className={styles.minorItem}>
              {p.context && <span className={styles.minorContext}>{p.context}</span>}
              <h4 className={styles.minorName}>{p.name}</h4>
              <p className={styles.minorBody}>{p.description}</p>
              <TagList items={p.stack} label={`${p.name} stack`} />
            </StaggerItem>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
