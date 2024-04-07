import http from 'node:http'
import fs from 'node:fs'
import { render } from '../lib/render.js'

http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.end(await render())
  } else if (req.url.startsWith('/photographs/')) {
    fs.createReadStream(`.${decodeURIComponent(req.url)}`).pipe(res)
  } else {
    res.end()
  }
}).listen(3000, () => {
  console.log('http://localhost:3000')
})