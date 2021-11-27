import {$} from '@/core/DOM';

export function resizeHandler(event, $root) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const cords = $parent.getCords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value
    $resizer.css({opacity: 1, [sideProp]: '-2000px'})

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - cords.right
        value = cords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - cords.bottom
        value = cords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }
    document.onmouseup = () => {
      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      $resizer.css({bottom: 0, right: 0, opacity: 0})
      document.onmousemove = null
      document.onmouseup = null
    }
  })

}
