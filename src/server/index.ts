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
    applyMiddlewares(app)

    const port = options.port || 12345
    app.listen(port, () => resolve(port))
  })
}
