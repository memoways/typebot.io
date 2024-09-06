let t = document.querySelector("typebot-standard")
let el = t.shadowRoot.querySelector("[data-advanced-style]")

t.dataset.hasAdvancedStyleCss = true

if (!el) {
  el = document.createElement("style")
  el.dataset.advancedStyle = true
  t.shadowRoot.appendChild(el)
}
el.innerHTML = CSS
