import { Command } from 'cmdk'
import { ArrowRight, ArrowUpRight, Copy, CornerDownLeft, FileText, Mail } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { profile, sections } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import { GitHubIcon, LinkedInIcon } from './Icons'
import styles from './CommandPalette.module.css'

type Props = { open: boolean; onOpenChange: (open: boolean) => void }

/** ⌘K / Ctrl+K palette: jump to sections and reach every contact action from the keyboard. Loaded on first use. */
export default function CommandPalette({ open, onOpenChange: setOpen }: Props) {
  const [copied, setCopied] = useState(false)

  const run = (action: () => void) => {
    setOpen(false)
    // Let the dialog close before scrolling so focus restoration does not fight the scroll.
    window.setTimeout(action, 60)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const openUrl = (href: string) => window.open(href, '_blank', 'noopener')

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      overlayClassName={styles.overlay}
      contentClassName={styles.content}
      loop
    >
      <div className={styles.inputRow}>
        <span className={styles.prompt} aria-hidden="true">
          ~/
        </span>
        <Command.Input className={styles.input} placeholder="Jump to a section or run a command…" />
        <kbd className={styles.esc}>esc</kbd>
      </div>

      <Command.List className={styles.list} data-lenis-prevent>
        <Command.Empty className={styles.empty}>No matches.</Command.Empty>

        <Command.Group heading="Navigate" className={styles.group}>
          <Item icon={<ArrowRight />} onSelect={() => run(() => scrollToId('top'))}>
            Home
          </Item>
          {sections.map((s, i) => (
            <Item
              key={s.id}
              icon={<ArrowRight />}
              hint={`§ ${String(i + 1).padStart(2, '0')}`}
              onSelect={() => run(() => scrollToId(s.id))}
            >
              {s.label}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Contact" className={styles.group}>
          <Item icon={<Copy />} onSelect={copyEmail} hint={copied ? 'copied' : profile.email} keywords={['email']}>
            Copy email address
          </Item>
          <Item icon={<Mail />} onSelect={() => run(() => (window.location.href = `mailto:${profile.email}`))}>
            Write an email
          </Item>
          <Item icon={<FileText />} onSelect={() => run(() => openUrl(profile.links.cv))} keywords={['resume']}>
            Open CV (PDF)
          </Item>
          <Item
            icon={<LinkedInIcon />}
            onSelect={() => run(() => openUrl(profile.links.linkedin))}
            hint={<ArrowUpRight />}
          >
            LinkedIn
          </Item>
          <Item icon={<GitHubIcon />} onSelect={() => run(() => openUrl(profile.links.github))} hint={<ArrowUpRight />}>
            GitHub
          </Item>
        </Command.Group>
      </Command.List>

      <div className={styles.footer} aria-hidden="true">
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> navigate
        </span>
        <span>
          <kbd>
            <CornerDownLeft size={11} />
          </kbd>{' '}
          select
        </span>
      </div>
    </Command.Dialog>
  )
}

type ItemProps = {
  children: string
  icon: ReactNode
  hint?: ReactNode
  keywords?: string[]
  onSelect: () => void
}

function Item({ children, icon, hint, keywords, onSelect }: ItemProps) {
  return (
    <Command.Item className={styles.item} onSelect={onSelect} keywords={keywords} value={children}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.itemLabel}>{children}</span>
      {hint && <span className={styles.hint}>{hint}</span>}
    </Command.Item>
  )
}
