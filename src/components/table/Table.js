import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, nexSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/DOM';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root,options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown','keydown','input'],
      ...options
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

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$onSubscribe('formula:input', (text) => this.selection.current.text(text))
    this.$onSubscribe('formula:enter', () => {
      this.selection.current.focus()
    })

  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
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
    this.$emit('table:input', $(event.target))

  }

  onKeydown(event) {
    const keys = ['Enter','Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']

    const key = event.key
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.dataId(true)
      const $next = this.$root.find(nexSelector(key,id,this.count-1))
      this.selectCell($next)

    } else {
      console.log('Shift Pressed')
    }
  }
  onInput(event){
    this.$emit('table:input', $(event.target))
  }

}


