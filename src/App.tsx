import { LazyMotion, MotionConfig } from 'motion/react'
import { PaletteLauncher } from './components/PaletteLauncher'
import { Nav } from './components/Nav'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { About } from './sections/About'
import { Achievements } from './sections/Achievements'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Publications } from './sections/Publications'
import { Skills } from './sections/Skills'

const loadFeatures = () => import('./motion-features').then((mod) => mod.default)

export function App() {
  useSmoothScroll()

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <PaletteLauncher />
        <main id="main">
          <Hero />
          <About />
          <Publications />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
