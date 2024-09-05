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

function render(args) {
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


  var video = document.createElement('video')
  video.style.position = "absolute"
  video.style.inset = "0"
  video.style.width = "100%"
  video.style.height = "100%"
  video.style.objectFit = "cover"

  dst.innerHTML = ""
  dst.prepend(video)

  var player = videojs(video)
  player.muted(args.muted != 0)
  player.src(args.url)
  player.controls(false)
  player.fill(true)
  player.disablePictureInPicture(true)
  player.loop(args.loop)
  player.ready(() => {
    src.style.opacity = "0"
    dst.style.opacity = "1"
    player.play()
    setTimeout(() => {
      src.innerHTML = ""
    }, 1000)
  })

}

function install(args) {
  if (document.querySelector("[data-videojs]")) {
    render(args)
    return
  }

  let link = document.createElement("link")
  link.setAttribute("data-videojs", true)
  link.setAttribute("href", "//vjs.zencdn.net/8.3.0/video-js.min.css")
  link.setAttribute("rel", "stylesheet")
  document.head.prepend(link)

  let script = document.createElement("script")
  script.setAttribute("data-videojs", true)
  script.setAttribute("src", "//vjs.zencdn.net/8.3.0/video.min.js")
  document.head.prepend(script)
  script.onload = () => {
    render(args)
  }
}

let opts = {url: URL, muted: MUTED, loop: LOOP}
install(opts)

