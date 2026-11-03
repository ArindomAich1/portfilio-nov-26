import { m, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

type Tag = 'div' | 'ul' | 'ol' | 'li' | 'p' | 'article'

type Props = {
  children: ReactNode
  as?: Tag
  className?: string
  delay?: number
  /** Stagger direct StaggerItem children instead of revealing as one block. */
  stagger?: number
}

/** Fades content up once it scrolls into view. Motion respects prefers-reduced-motion via MotionConfig. */
export function Reveal({ children, as = 'div', className, delay = 0, stagger }: Props) {
  const Comp = m[as] as typeof m.div
  const variants: Variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
    : {
        hidden: revealVariants.hidden,
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } },
      }

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {children}
    </Comp>
  )
}

export function StaggerItem({ children, as = 'div', className }: Omit<Props, 'delay' | 'stagger'>) {
  const Comp = m[as] as typeof m.div
  return (
    <Comp className={className} variants={revealVariants}>
      {children}
    </Comp>
  )
}
