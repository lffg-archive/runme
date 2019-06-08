import bootstrapServer from './server'

interface RunmeOptions {
  serverPort: number
}

export default async function start() {
  const port = await bootstrapServer({})
  console.log(`Runme running at http://localhost:${port}`)
}
