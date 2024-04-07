import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export const render = async () => {
  const templates = {
    index: await fs.readFile(fileURLToPath(new URL('../templates/index.html', import.meta.url)), 'utf8'),
    photo: await fs.readFile(fileURLToPath(new URL('../templates/photo.html', import.meta.url)), 'utf8')
  }
  const photos = (await fs.readdir(new URL('../photographs', import.meta.url)))
    .filter(name => name.endsWith('.jpg'))
    .sort()
    .reverse()
  return templates.index
    .replace(
      '{{photos}}',
      photos
        .map(filename =>
          templates.photo.replace('{{filename}}', filename)
        )
        .join('\n')
    )
    .replace('{{year}}', new Date().getFullYear())
}
