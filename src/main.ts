import bootstrapServer from './server';

export default async function start() {
  const port = await bootstrapServer();
  console.log(`🚀 Runme running at http://localhost:${port}`);
}
