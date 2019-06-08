import http from 'http'
import express from 'express'
import applyMiddlewares from './middlewares'

interface ServerOptions {
  port?: number
}

export default function bootstrapServer(
  options: ServerOptions = {}
): Promise<number> {
  return new Promise((resolve) => {
    const app = express()
    const server = http.createServer(app)
    applyMiddlewares(app, server)

    const port = options.port || 5000
    server.listen(port, () => resolve(port))
  })
}
