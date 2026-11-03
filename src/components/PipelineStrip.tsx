import { useInView } from 'motion/react'
import { useRef, type CSSProperties } from 'react'
import type { PipelineNode } from '../data/types'
import styles from './PipelineStrip.module.css'

type Props = { nodes: PipelineNode[]; label: string }

/** A project's architecture as a subway-style flow; a packet runs through it while it is on screen. */
export function PipelineStrip({ nodes, label }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const live = useInView(ref, { margin: '-15% 0px -15% 0px' })

  return (
    <div
      ref={ref}
      className={`${styles.strip} ${live ? styles.live : ''}`}
      style={{ '--n': nodes.length } as CSSProperties}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.fill} />
        <span className={styles.packet} />
      </span>
      <ol className={styles.nodes} aria-label={label}>
        {nodes.map((node, i) => (
          <li key={node.label} className={styles.node} style={{ '--i': i } as CSSProperties}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.text}>
              <span className={styles.label}>{node.label}</span>
              {node.note && <span className={styles.note}>{node.note}</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
