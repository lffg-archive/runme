/*global io*/

import { createContainer, appendToLog } from './command-utils.js';
import { form, fields } from './selectors.js';
import { getId } from './utils.js';

const socket = io();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  socket.emit('new-command', {
    id: getId(),
    command: fields.command.value,
    args: fields.args.value
      .split(' ')
      .map((arg) => arg.trim())
      .filter(Boolean)
  });
});

/** @type {Map<string, { container: HTMLElement, log: HTMLElement }>} */
const commands = new Map();
window.getCommands = () => commands;

socket.on('command-created', (data) => {
  console.log('command-created', data);
  commands.set(data.id, createContainer(data.id, data.commandString));
});

socket.on('command-output', (data) => {
  console.log('command-output', data);
  const { log } = commands.get(data.id);
  data.data.split('\n').forEach((line) => appendToLog(log, line));
});

socket.on('command-closed', (data) => {
  const { container } = commands.get(data.id);
  container.classList.add('--d');
});

socket.on('connect', () => console.log('@socket.event: connect'));
socket.on('event', () => console.log('@socket.event: event'));
socket.on('disconnect', () => console.log('@socket.event: disconnect'));
