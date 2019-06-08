/*global io*/

import { createContainer } from './command-utils.js'
import { form, fields } from './selectors.js'
import { getId } from './utils.js'

const socket = io()

form.addEventListener('submit', (event) => {
  event.preventDefault()

  socket.emit('new-command', {
    id: getId(),
    command: fields.command.value,
    args: fields.args.value
      .split(' ')
      .map((arg) => arg.trim())
      .filter(Boolean)
  })
})

/** @type {Map<string, { container: HTMLElement, log: HTMLElement }>} */
const commands = new Map()
window.getCommands = () => commands

socket.on('command-created', (data) => {
  console.log('command-created', data)
  commands.set(data.id, createContainer(data.id))
})

socket.on('command-output', (data) => {
  console.log('-'.repeat(15))
  console.log('command-output')
  console.log(data)
  console.log('-'.repeat(15))
})

socket.on('command-closed', (data) => {
  console.log('-'.repeat(15))
  console.log('command-close')
  console.log(data)
  console.log('-'.repeat(15))
})

socket.on('connect', () => console.log('@socket.event: connect'))
socket.on('event', () => console.log('@socket.event: event'))
socket.on('disconnect', () => console.log('@socket.event: disconnect'))
