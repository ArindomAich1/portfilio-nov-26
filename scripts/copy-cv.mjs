// Copies the latest LaTeX build of the resume into public/ so the site always ships the current CV.
import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = resolve(root, '..', 'resume.pdf')
const dest = resolve(root, 'public', 'Arindom_Aich_CV.pdf')

if (existsSync(src)) {
  copyFileSync(src, dest)
  console.log('CV copied: ../resume.pdf -> public/Arindom_Aich_CV.pdf')
} else if (existsSync(dest)) {
  console.log('CV: ../resume.pdf not found, keeping existing public/Arindom_Aich_CV.pdf')
} else {
  console.warn('CV: no resume.pdf found; the CV link will 404 until one is added')
}
