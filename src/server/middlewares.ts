import { Express } from 'express'

export default function applyMiddlewares(app: Express) {
  app.get('/', (req, res) => {
    res.send('Hello, Runme!')
  })
}
