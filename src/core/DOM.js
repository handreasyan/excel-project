class DOM {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    if(this.$el.tagName.toLocaleLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  append(node) {
    if (node instanceof DOM) {
      node = node.$el
    }
    this.$el.appendChild(node)
    return this
  }
  get data() {
    return this.$el.dataset
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCords() {
    return this.$el.getBoundingClientRect()
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  css(styles = {}) {
    Object.keys(styles).forEach((prop)=> this.$el.style[prop] = styles[prop])
  }
  dataId(parse) {
    if (parse) {
      const [row, col] = this.dataId().split(':')
      return {
        row: Number(row),
        col: Number(col)
      }
    }
    return this.data.id
  }
  addClass(className) {
    if (this.$el) {
      this.$el.classList.add(className)
    }
    return this
  }
  focus() {
    this.$el.focus()
    return this
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  removeClass(className) {
    if (this.$el) {
      this.$el.classList.remove(className)
    }
    return this
  }
  getStyle(styles = []) {
    return styles.reduce((res, s)=>{
      res[s] = this.$el.style[s]
      return res
    },{})
  }

}


export function $(selector) {
  return new DOM(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
