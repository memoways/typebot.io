function render(url) {
  const a = container("a")
  const b = container("b")
  const t = document.querySelector("typebot-standard")
  let cont = t.shadowRoot.querySelector(".typebot-container")

  let src = null
  let dst = null

  if (a.dataset.advancedStyleVisibility == "visible") {
    src = a
    dst = b
  } else {
    src = b
    dst = a
  }

  let img = new Image()
  img.onload = () => {
    src.style.opacity = "0"
    src.dataset.advancedStyleVisibility = "fadeout"

    dst.innerHTML = ""
    dst.dataset.advancedStyleVisibility = "fadein"
    dst.style.opacity = "1"
    dst.style.backgroundImage = "url(" + url + ")"

    cont.dataset.advancedStyleType = "image"

    setTimeout(() => {
      src.innerHTML = ""
      src.dataset.advancedStyleType = "none"
      src.dataset.advancedStyleVisibility = "hidden"

      dst.dataset.advancedStyleVisibility = "visible"
      dst.dataset.advancedStyleType = "image"
      setTimeout(() => unlock(), 1000)
    }, 1000)
  }
  img.src = url
}

lock_run(() => render(URL))
