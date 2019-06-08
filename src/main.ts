import bootstrapServer from './server'

<<<<<<< HEAD
export default async function start() {
  const port = await bootstrapServer()
  console.log(`🚀 Runme running at http://localhost:${port}`)
=======
interface RunmeOptions {
  serverPort: number
}

export default async function start() {
  const port = await bootstrapServer({})
  console.log(`Runme running at http://localhost:${port}`)
>>>>>>> 6bf666feef09291553f1d8b61258f8c20b2aa668
}
