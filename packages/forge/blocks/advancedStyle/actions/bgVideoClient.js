function render(args) {
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


  var video = document.createElement('video')
  video.style.position = "absolute"
  video.style.inset = "0"
  video.style.width = "100%"
  video.style.height = "100%"
  video.style.objectFit = "cover"

  dst.innerHTML = ""
  dst.dataset.advancedStyleVideoPlaying = false
  dst.prepend(video)

  var player = videojs(video)
  player.muted(args.muted != 0)
  player.src(args.url)
  player.controls(false)
  player.fill(true)
  player.disablePictureInPicture(true)
  player.loop(args.loop)
  player.on("paused", () => {
    dst.dataset.advancedStyleVideoPlaying = false
    cont.dataset.advancedStyleVideoStatus = "paused"
  })
  player.on("ended", () => {
    dst.dataset.advancedStyleVideoPlaying = false
    cont.dataset.advancedStyleVideoStatus = "ended"
    unlock()
  })
  player.on("ready", () => {
    player.play()
  })

  player.on("playing", () => {
    src.style.opacity = "0"
    src.dataset.advancedStyleVisibility = "fadeout"

    dst.style.opacity = "1"
    dst.dataset.advancedStyleVisibility = "fadein"

    dst.dataset.advancedStyleVideoPlaying = true
    cont.dataset.advancedStyleVideoStatus = "playing"

    setTimeout(() => {
      src.innerHTML = ""
      src.dataset.advancedStyleType = "none"
      src.dataset.advancedStyleVisibility = "hidden"

      dst.dataset.advancedStyleVisibility = "visible"
      dst.dataset.advancedStyleType = "video"

      cont.dataset.advancedStyleType = "video"
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

lock_run(() => install(opts))

