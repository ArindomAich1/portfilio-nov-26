import { useEffect, useRef, type RefObject } from 'react'

type GraphNode = { bx: number; by: number; phase: number; amp: number; label?: string }
type Edge = { a: number; b: number; delay: number }
type Packet = { edge: number; from: number; t: number; speed: number }

const LABELS = ['LLM', 'RAG', 'SDN', 'IoMT', '5G', 'QoS', 'Edge', 'PyTorch', 'NLP', 'Agents', 'Vector DB', 'FastAPI', 'Docker', 'Transformers', 'MLOps', 'Fine-tuning']
const COLS = 6
const ROWS = 4
const INTRO_MS = 1600

/** Deterministic PRNG so the graph has the same shape on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildGraph() {
  const rand = mulberry32(20260611)
  const nodes: GraphNode[] = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      nodes.push({
        bx: (c + 0.2 + rand() * 0.6) / COLS,
        by: (r + 0.2 + rand() * 0.6) / ROWS,
        phase: rand() * Math.PI * 2,
        amp: 4 + rand() * 7,
      })
    }
  }

  // Connect each node to its two nearest neighbours (deduplicated).
  const seen = new Set<string>()
  const edges: Edge[] = []
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: (m.bx - n.bx) ** 2 + ((m.by - n.by) * 0.6) ** 2 }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (seen.has(key)) return
        seen.add(key)
        edges.push({ a: i, b: j, delay: Math.min(n.bx, nodes[j].bx) * 0.6 })
      })
  })

  const adjacency = nodes.map((_, i) => edges.flatMap((e, k) => (e.a === i || e.b === i ? [k] : [])))

  return { nodes, edges, adjacency, rand }
}

type Box = { left: number; top: number; right: number; bottom: number }

/** Puts the labels on nodes that are visible: inside the faded edges, below `topClear` and not behind `avoid`. */
function assignLabels(nodes: GraphNode[], width: number, height: number, avoid: Box | null, topClear: number) {
  const pad = 10
  // On narrow screens the graph fades out from 30% of its height, so keep labels in the top half.
  const maxBy = width < 600 ? 0.5 : 0.85
  const visible = nodes
    .map((n, i) => ({ n, i, x: n.bx * width, y: n.by * height }))
    .filter(({ n, x, y }) => {
      // Skip the faded left edge, the clipped right edge and the faded bottom.
      if (n.bx < 0.2 || n.bx > 0.9 || n.by > maxBy || y < topClear) return false
      if (!avoid) return true
      return x < avoid.left - pad || x > avoid.right + pad || y < avoid.top - pad || y > avoid.bottom + pad
    })
    .sort((p, q) => p.n.by - q.n.by || p.n.bx - q.n.bx)

  nodes.forEach((n) => (n.label = undefined))
  // LABELS is in priority order, so a crowded layout keeps the most relevant ones.
  const count = Math.min(LABELS.length, visible.length)
  const step = visible.length / count
  LABELS.slice(0, count).forEach((label, k) => {
    nodes[visible[Math.floor(k * step)].i].label = label
  })
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))

/** Thin-line network graph behind the hero: drifting nodes, travelling packets, cursor-aware edges. */
type Props = {
  className?: string
  /** Element drawn on top of the graph (the portrait); labels are kept clear of it. */
  avoidRef?: RefObject<HTMLElement | null>
}

export function SignalGraph({ className, avoidRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const css = getComputedStyle(document.documentElement)
    const color = {
      rule: css.getPropertyValue('--rule-strong').trim() || '#c4beb0',
      ink: css.getPropertyValue('--ink').trim() || '#15171c',
      ink3: css.getPropertyValue('--ink-3').trim() || '#6b707a',
      paper: css.getPropertyValue('--paper').trim() || '#f7f5f0',
      accent: css.getPropertyValue('--accent').trim() || '#1f3a93',
    }
    const mono = css.getPropertyValue('--font-mono').trim() || 'monospace'

    const { nodes, edges, adjacency, rand } = buildGraph()
    const packets: Packet[] = Array.from({ length: 6 }, (_, k) => {
      const edge = Math.floor(rand() * edges.length)
      return { edge, from: edges[edge].a, t: (k * 0.17) % 1, speed: 0.28 + rand() * 0.22 }
    })

    let width = 0
    let height = 0
    let frame = 0
    let running = false
    let start = 0
    let last = 0
    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = avoidRef?.current?.getBoundingClientRect()
      const avoid =
        target && target.width > 0
          ? {
              left: target.left - rect.left,
              top: target.top - rect.top,
              right: target.right - rect.left,
              bottom: target.bottom - rect.top,
            }
          : null
      // Keep labels below the fixed nav (about 84px from the top of the page).
      assignLabels(nodes, width, height, avoid, 84 - (rect.top + window.scrollY))
      if (!running) draw(reduced ? Infinity : last - start, 0)
    }

    const position = (n: GraphNode, time: number) => {
      if (reduced) return { x: n.bx * width, y: n.by * height }
      return {
        x: n.bx * width + Math.sin(time * 0.00035 + n.phase) * n.amp,
        y: n.by * height + Math.cos(time * 0.0003 + n.phase * 1.3) * n.amp,
      }
    }

    const draw = (elapsed: number, dt: number) => {
      ctx.clearRect(0, 0, width, height)
      const intro = reduced ? 1 : clamp01(elapsed / INTRO_MS)
      const pts = nodes.map((n) => position(n, elapsed))

      // Edges, drawn in left-to-right during the intro and tinted near the cursor.
      ctx.lineWidth = 1
      for (const e of edges) {
        const p = easeOut(clamp01((intro * 1.6 - e.delay) / 1))
        if (p <= 0) continue
        const A = pts[e.a]
        const B = pts[e.b]
        const mx = (A.x + B.x) / 2
        const my = (A.y + B.y) / 2
        const near = clamp01(1 - Math.hypot(mx - pointer.x, my - pointer.y) / 180)
        ctx.strokeStyle = near > 0 ? color.accent : color.rule
        ctx.globalAlpha = near > 0 ? 0.25 + near * 0.45 : 0.7
        ctx.beginPath()
        ctx.moveTo(A.x, A.y)
        ctx.lineTo(A.x + (B.x - A.x) * p, A.y + (B.y - A.y) * p)
        ctx.stroke()
      }

      // Packets travelling along edges.
      if (!reduced && intro >= 1) {
        for (const pk of packets) {
          const e = edges[pk.edge]
          const A = pts[pk.from]
          const to = e.a === pk.from ? e.b : e.a
          const B = pts[to]
          const len = Math.hypot(B.x - A.x, B.y - A.y) || 1
          pk.t += (pk.speed * 120 * dt) / 1000 / len
          if (pk.t >= 1) {
            const options = adjacency[to].filter((k) => k !== pk.edge)
            pk.edge = options.length ? options[Math.floor(rand() * options.length)] : pk.edge
            pk.from = to
            pk.t = 0
            continue
          }
          for (let s = 3; s >= 0; s--) {
            const tt = Math.max(0, pk.t - s * 0.035)
            ctx.globalAlpha = s === 0 ? 0.95 : 0.18 / s
            ctx.fillStyle = color.accent
            ctx.beginPath()
            ctx.arc(A.x + (B.x - A.x) * tt, A.y + (B.y - A.y) * tt, s === 0 ? 2.4 : 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Nodes and labels.
      ctx.globalAlpha = easeOut(clamp01(intro * 1.4))
      ctx.font = `500 11px ${mono}`
      ctx.textBaseline = 'middle'
      nodes.forEach((n, i) => {
        const { x, y } = pts[i]
        ctx.fillStyle = color.paper
        ctx.strokeStyle = n.label ? color.ink : color.ink3
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(x, y, n.label ? 3.5 : 2.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        if (n.label) {
          ctx.fillStyle = color.ink3
          ctx.fillText(n.label, x + 9, y)
        }
      })
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      if (!start) start = now
      const dt = last ? Math.min(now - last, 50) : 16
      last = now
      draw(now - start, dt)
      frame = requestAnimationFrame(loop)
    }

    const play = () => {
      if (running || reduced) return
      running = true
      last = 0
      frame = requestAnimationFrame(loop)
    }
    const pause = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    resize()

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()))
    visibility.observe(canvas)
    const onVisibility = () => (document.hidden ? pause() : play())
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    if (reduced) draw(Infinity, 0)

    return () => {
      pause()
      resizeObserver.disconnect()
      visibility.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [avoidRef])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
