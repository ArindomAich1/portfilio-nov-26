import { Award, Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { patent, priorResearch, profile } from '../data/content'
import styles from './Publications.module.css'

const citation = `${profile.name}, et al. “${patent.title}.” Patent Application No. ${patent.applicationNo}, published.`

export function Publications() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const project = priorResearch[0]

  return (
    <Section id="publications" index={2} label="Publications" title="Publications">
      <Reveal as="article" className={styles.entry}>
        <div className={styles.side}>
          <span className={styles.type}>Patent</span>
          <span className={styles.status}>{patent.status}</span>
        </div>
        <div className={styles.main}>
          <h3 className={styles.title}>{patent.title}</h3>
          <p className={styles.meta}>
            <span>
              Application No. <span className={styles.number}>{patent.applicationNo}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{patent.context}</span>
          </p>
          <button type="button" className={styles.copy} onClick={copy} aria-live="polite">
            {copied ? <Check size={14} strokeWidth={1.75} /> : <Copy size={14} strokeWidth={1.5} />}
            {copied ? 'Citation copied' : 'Copy citation'}
          </button>
        </div>
      </Reveal>

      <Reveal as="article" className={styles.entry} delay={0.08}>
        <div className={styles.side}>
          <span className={styles.type}>Research project</span>
          <span className={styles.status}>{project.context}</span>
        </div>
        <div className={styles.main}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.meta}>
            <span>Contributor</span>
          </p>
          <a className={styles.copy} href={project.certificate} target="_blank" rel="noopener">
            <Award size={14} strokeWidth={1.5} />
            View certificate
          </a>
        </div>
      </Reveal>

      {profile.links.scholar && (
        <Reveal as="p" className={styles.more}>
          Full list on{' '}
          <a className="link" href={profile.links.scholar} target="_blank" rel="noopener">
            Google Scholar
          </a>
        </Reveal>
      )}
    </Section>
  )
}
