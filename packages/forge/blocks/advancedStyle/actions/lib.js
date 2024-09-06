function container(name) {
  const t = document.querySelector("typebot-standard")
  let cont = t.shadowRoot.querySelector(".typebot-container")
  cont.style.background = "transparent"
  cont.style.zIndex = "2"

  const id = `advanced-style-container-${name}`
  let div = document.getElementById(id)
  if (div) {
    return div
  }
  div = document.createElement("div")
  div.className = "advanced-style-container"
  div.id = id
  div.style.position = "absolute"
  div.style.inset = "0"
  div.style.backgroundSize = "cover"
  div.style.backgroundPosition = "center"
  div.style.display = "block"
  div.style.opacity = "0"
  div.style.zIndex = "-1"
  div.style.transition = "opacity 1s ease-in-out"
  const root = document.querySelector("typebot-standard").parentElement
  root.style.position = "relative"
  root.style.zIndex = "0"
  root.prepend(div)

  return div
}

function lock_run(cb) {
  let q = window.__queue__
  if (!q) {
    q = window.__queue__ = {locked: false, callbacks: []}
  }

  if (q.locked) {
    q.callbacks.unshift(cb)
  } else {
    q.locked = true
    cb()
  }
}

function unlock() {
  let q = window.__queue__
  if (!q) {
    return
  }

  if (!q.locked) {
    throw new Error("Unlocked execution environment while not locked")
  } else {
    q.locked = false
    const cb = q.callbacks.pop()
    if (!cb) {
      return
    }
    q.locked = true
    cb()
  }
}

