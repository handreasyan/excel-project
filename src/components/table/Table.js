import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {isCell, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/DOM';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(20)
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
        /*

          // lesson 05_08

        const target = $target.dataId(true)
        const current = this.selection.current.dataId(true)

        const cols = range(current.col, target.col)
        const rows = range(current.row, target.row)

        const ids = cols.reduce((acc, col)=>{
          rows.forEach(row => acc.push(`${row}:${col}`))
          return acc
        }, [])

        console.log(ids)*/
      } else {
        this.selection.select($target)
      }
    }
  }
}
