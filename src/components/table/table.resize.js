import {$} from '@/core/DOM';

export function resizeHandler(event, $root) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const cords = $parent.getCords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  $resizer.css({opacity: 1, [sideProp]: '-2000px'})
  let value
  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = Math.floor(e.pageX - cords.right)
      value = cords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = Math.floor(e.pageY - cords.bottom)
      $resizer.css({bottom: -delta + 'px'})
      value = cords.height + delta
    }
  }
  document.onmouseup = () => {
    if (type === 'col') {
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
      $resizer.css({right: 0, bottom: 0, opacity: 0})
    } else {
      $parent.css({height: value + 'px'})
      $resizer.css({bottom: 0, right: 0, opacity: 0})
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}
