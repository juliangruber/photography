import fs from 'node:fs/promises'
import { render } from '../lib/render.js'
import { fileURLToPath } from 'node:url'

await fs.writeFile(
  fileURLToPath(new URL('../index.html', import.meta.url)),
  await render()
)
