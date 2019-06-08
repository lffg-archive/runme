export function addAttributes(node, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value)
  })
}

export function createContainer(id) {
  const container = document.createElement('div')
  addAttributes(container, { class: 'command-container --r', 'data-id': id })

  const label = document.createElement('h2')
  label.innerHTML = `Comando (<code>${id}</code>)`
  container.appendChild(label)

  const log = document.createElement('pre')
  addAttributes(log, { class: 'command-container__log' })
  container.appendChild(log)

  document.body.appendChild(container)

  return { container, log }
}
