export type Link = { label: string; href: string }

export type Role = {
  title: string
  org: string
  place?: string
  start: string
  end: string
  current?: boolean
  summary?: string
  bullets: string[]
  stack?: string[]
  projects?: string[]
  certificate?: Link
}

export type PipelineNode = { label: string; note?: string }

export type Project = {
  name: string
  tagline: string
  domain: string
  stack: string[]
  bullets: string[]
  pipeline: PipelineNode[]
  href?: string
}

export type MinorProject = {
  name: string
  description: string
  stack: string[]
  context?: string
}

export type SkillGroup = { label: string; items: string[] }

export type Education = {
  school: string
  degree: string
  place: string
  start: string
  end: string
  score?: string
}

export type Achievement = { title: string; detail: string; link?: Link }
