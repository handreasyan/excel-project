import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, nexSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/DOM';

export class Table extends ExcelComponent {
  static className = 'excel__table'


  constructor($root) {
    super($root, {
      listeners: ['mousedown','keydown'],
    });
    this.count = 20
  }

  toHTML() {
    return createTable(this.count)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $el = this.$root.find('[data-id="0:0"]') // first field in table
    this.selection.select($el)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target,this.selection.current).map(id=>this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
  onKeydown(event) {
    const keys = ['Enter','Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']

    const key = event.key
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.dataId(true)
      const $next = this.$root.find(nexSelector(key,id,this.count-1))
      this.selection.select($next)
    } else {
      console.log('Shift Pressed')
    }

  }
}


