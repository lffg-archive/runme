export function addAttributes(node, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value)
  })
}

export function appendToLog(logElement, logString) {
  const logItem = document.createElement('div')
  addAttributes(logItem, { class: 'command-container__log-item' })

  const textNode = document.createTextNode(logString)
  logItem.appendChild(textNode)

  logElement.appendChild(logItem)
}

export function createContainer(id, commandString) {
  const container = document.createElement('div')
  addAttributes(container, { class: 'command-container --r', 'data-id': id })

  const label = document.createElement('h2')
  const closeButton = document.createElement('button')
  closeButton.textContent = 'Fechar'
  closeButton.addEventListener('click', () => container.classList.add('--h'))
  label.appendChild(closeButton)
  const span = document.createElement('span')
  span.innerHTML = `Comando (<code>${id}</code>)`
  label.appendChild(span)
  container.appendChild(label)

  const log = document.createElement('pre')
  addAttributes(log, { class: 'command-container__log' })
  appendToLog(log, `$ ${commandString}`)
  container.appendChild(log)

  document.body.appendChild(container)

  return { container, log }
}
