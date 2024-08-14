function container(name) {
  const klass = `advanced-media-container-${name}`
  let div = document.querySelector(`.${klass}`)
  if (div) {
    return div
  }
  div = document.createElement("div")
  div.className = klass 
  div.style.position = "absolute"
  div.style.inset = "0"
  div.style.backgroundSize = "cover"
  div.style.backgroundPosition = "center"
  div.style.display = "block"
  div.style.opacity = "0"
  div.style.transition = "opacity 1s ease-in-out"
  const root = document.querySelector("typebot-standard").parentElement
  root.prepend(div)
  return div
}

function render(url) {
  const a = container("a")
  const b = container("b")

  let src = null
  let dst = null

  if (a.style.opacity == "0") {
    src = b
    dst = a
  } else {
    src = a
    dst = b
  }

  let img = new Image()
  img.onload = () => {
    src.style.opacity = "0"
    dst.innerHTML = ""
    dst.style.opacity = "1"
    dst.style.backgroundImage = "url(" + url + ")"
  }
  img.src = url
}

render(url)
