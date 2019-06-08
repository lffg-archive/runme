import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { Server } from 'http'
import { join } from 'path'
import express, { Express } from 'express'
import socket from 'socket.io'

interface RawCommand {
  id: string
  command: string
  args: string[]
}

const commands = new Map<string, ChildProcessWithoutNullStreams>()

export default function applyMiddlewares(app: Express, server: Server) {
  const io = socket(server)

  io.on('connection', (socket) => {
    console.log('User connected.')

    socket.on('new-command', ({ id, command, args }: RawCommand) => {
      let commandInstance: ChildProcessWithoutNullStreams | null = null

      try {
        commandInstance = spawn(command, args)
        commands.set(id, commandInstance)
      } catch (error) {
        console.error('[ERR!] Error')
        return
      }

      socket.emit('command-created', {
        id,
        commandString: `${command} ${args.join(' ')}`
      })

      commandInstance.stdout.on('data', (chunk) => {
        const data = Buffer.from(chunk).toString('utf8')
        socket.emit('command-output', { id, type: 'stdout', data })
      })

      commandInstance.stderr.on('data', (chunk) => {
        const data = Buffer.from(chunk).toString('utf8')
        socket.emit('command-output', { id, type: 'stderr', data })
      })

      commandInstance.on('close', () => {
        commands.delete(id)
        console.log(`Command "${id}" closed (PID=${commandInstance}).`)
        socket.emit('command-closed', { id, type: 'closed' })
      })
    })

    socket.on('disconnect', () => {
      commands.forEach((command, id) => {
        const pid = command.pid
        command.kill()
        console.log(`Command "${id}" killed (PID=${pid}).`)
        commands.delete(id)
      })
    })
  })

  io.on('new-command', (data: any) => {
    console.log(data)
  })

  app.use(express.static(join(__dirname, '..', 'public')))
}
