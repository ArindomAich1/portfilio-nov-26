import type { AnchorHTMLAttributes, ReactNode } from 'react'
import styles from './ui.module.css'

export function Tag({ children }: { children: ReactNode }) {
  return <span className={styles.tag}>{children}</span>
}

export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className={styles.tagList} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost'
  icon?: ReactNode
}

export function ButtonLink({ variant = 'ghost', icon, children, className, ...rest }: ButtonProps) {
  return (
    <a className={`${styles.button} ${styles[variant]} ${className ?? ''}`} {...rest}>
      {icon}
      <span>{children}</span>
    </a>
  )
}

export function LiveDot() {
  return <span className={styles.liveDot} aria-hidden="true" />
}
