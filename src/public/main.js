/*global io*/

import { form, fields } from './selectors.js'

const socket = io('http://localhost:12345')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = Object.entries(fields).reduce(
    (a, [name, { value }]) => ({ ...a, [name]: value }),
    {}
  )

  console.log(data)
})

socket.on('connect', () => console.log('@socket.event: connect'))
socket.on('event', () => console.log('@socket.event: event'))
socket.on('disconnect', () => console.log('@socket.event: disconnect'))
