import { ArrowUpRight, Check, Copy, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { GitHubIcon, LinkedInIcon } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { profile } from '../data/content'
import styles from './Contact.module.css'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = `Portfolio contact from ${name}`
    const body = `${message}\n\n—\n${name}\n${email}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <Section id="contact" index={8} label="Contact" title="Contact">
      <div className={styles.layout}>
        <Reveal className={styles.direct}>
          <p className={styles.kicker}>Email</p>
          <div className={styles.emailRow}>
            <a className={styles.email} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button type="button" className={styles.copy} onClick={copyEmail} aria-label="Copy email address">
              {copied ? <Check size={16} strokeWidth={1.75} /> : <Copy size={16} strokeWidth={1.5} />}
            </button>
            <span className="visually-hidden" aria-live="polite">
              {copied ? 'Email address copied' : ''}
            </span>
          </div>

          <ul className={styles.links}>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener" className={styles.linkRow}>
                <LinkedInIcon size={16} />
                <span>LinkedIn</span>
                <span className={styles.handle}>/in/arindomaich</span>
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" className={styles.arrow} />
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener" className={styles.linkRow}>
                <GitHubIcon size={16} />
                <span>GitHub</span>
                <span className={styles.handle}>@ArindomAich1</span>
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" className={styles.arrow} />
              </a>
            </li>
          </ul>

          <p className={styles.location}>
            {profile.location} <span aria-hidden="true">·</span> {profile.coords}
          </p>
        </Reveal>

        <Reveal className={styles.formWrap} delay={0.1}>
          <form name="contact" onSubmit={submit} className={styles.form}>
            <div className={styles.row}>
              <label className={styles.field}>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>
            <label className={styles.field}>
              <span>Message</span>
              <textarea name="message" rows={5} required />
            </label>

            <div className={styles.actions}>
              <button type="submit" className={styles.submit}>
                <Send size={15} strokeWidth={1.5} aria-hidden="true" />
                Send message
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
