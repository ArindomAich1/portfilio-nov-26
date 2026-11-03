import { ArrowUpRight, Check, Copy, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { GitHubIcon, LinkedInIcon } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { profile } from '../data/content'
import styles from './Contact.module.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  // Netlify Forms: the static twin of this form lives in index.html so the build bot can detect it.
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString()
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
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
          {status === 'sent' ? (
            <div className={styles.sent} role="status">
              <Check size={22} strokeWidth={1.5} aria-hidden="true" />
              <p className={styles.sentTitle}>Message sent.</p>
              <p>Thank you. I will reply to the email address you provided.</p>
              <button type="button" className="link" onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={submit}
              className={styles.form}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="visually-hidden">
                <label>
                  Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

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
                <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                  <Send size={15} strokeWidth={1.5} aria-hidden="true" />
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                {status === 'error' && (
                  <p className={styles.error} role="alert">
                    Could not send. Please email{' '}
                    <a className="link" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>{' '}
                    directly.
                  </p>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  )
}
