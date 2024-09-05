function container(name) {
  const klass = `advanced-style-container-${name}`
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
  div.style.zIndex = "-1"
  div.style.transition = "opacity 1s ease-in-out"
  const root = document.querySelector("typebot-standard").parentElement
  root.style.position = "relative"
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
    setTimeout(() => {
      src.innerHTML = ""
    }, 1000)
  }
  img.src = url
}

render(URL)
