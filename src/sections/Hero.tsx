import { m } from 'motion/react'
import { useRef } from 'react'
import { ArrowDown, FileText, Mail } from 'lucide-react'
import portrait from '../assets/arindom-cutout.png?w=480;720;958&format=avif;webp&as=picture'
// Single small PNG for browsers without AVIF/WebP; it keeps the transparency.
import portraitFallback from '../assets/arindom-cutout.png?w=480&format=png'
import { GitHubIcon, LinkedInIcon } from '../components/Icons'
import { SignalGraph } from '../components/SignalGraph'
import { ButtonLink, LiveDot } from '../components/ui'
import { profile } from '../data/content'
import { useLocalTime } from '../hooks/useLocalTime'
import { scrollToId } from '../hooks/useSmoothScroll'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
})

export function Hero() {
  const figureRef = useRef<HTMLElement>(null)
  const time = useLocalTime(profile.timeZone)
  const words = profile.name.split(' ')

  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.dots} />
        <SignalGraph className={styles.graph} avoidRef={figureRef} />
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <m.p className={styles.meta} {...fade(0.1)}>
            <span>{profile.location.split(',')[0]}</span>
            <span className={styles.sep} aria-hidden="true" />
            <span>
              <time>{time}</time> IST
            </span>
            <span className={styles.sep} aria-hidden="true" />
            <span>{profile.coords}</span>
          </m.p>

          <m.p className={styles.status} {...fade(0.2)}>
            <LiveDot />
            {profile.role} · {profile.affiliation}
          </m.p>

          <h1 className={styles.name}>
            {words.map((word, i) => (
              <span key={word} className={styles.mask}>
                <m.span
                  className={styles.word}
                  initial={{ y: '108%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.05, ease, delay: 0.25 + i * 0.12 }}
                >
                  {word}
                </m.span>
              </span>
            ))}
          </h1>

          {/* Rise without fading: the statement is the LCP element, and opacity 0 would delay it. */}
          <m.p
            className={styles.statement}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
          >
            {profile.statement}
          </m.p>

          <m.div className={styles.ctas} {...fade(0.7)}>
            <ButtonLink
              variant="primary"
              href={profile.links.cv}
              target="_blank"
              rel="noopener"
              icon={<FileText strokeWidth={1.5} />}
            >
              Download CV
            </ButtonLink>
            <ButtonLink href={`mailto:${profile.email}`} icon={<Mail strokeWidth={1.5} />}>
              Email
            </ButtonLink>
            <a
              className={styles.iconLink}
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={17} />
            </a>
            <a
              className={styles.iconLink}
              href={profile.links.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <GitHubIcon size={17} />
            </a>
          </m.div>
        </div>

        <figure ref={figureRef} className={styles.figure}>
          <div className={styles.stage}>
            {/* Rise without fading: the portrait is the LCP element, and opacity 0 would delay it. */}
            <m.picture
              className={styles.picture}
              initial={{ y: 28 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.2 }}
            >
              <source type="image/avif" srcSet={portrait.sources.avif} sizes="(max-width: 900px) 320px, 540px" />
              <source type="image/webp" srcSet={portrait.sources.webp} sizes="(max-width: 900px) 320px, 540px" />
              <img
                src={portraitFallback}
                width={958}
                height={1134}
                alt={`Portrait of ${profile.name}`}
                fetchPriority="high"
                decoding="async"
              />
            </m.picture>
          </div>
          <figcaption className={styles.caption}>
            <span>fig. 01</span>
            <span>{profile.name}</span>
          </figcaption>
        </figure>
      </div>

      <m.button
        type="button"
        className={styles.cue}
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <span>Scroll</span>
        <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" />
      </m.button>
    </section>
  )
}
