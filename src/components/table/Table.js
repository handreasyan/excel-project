import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, nexSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/DOM';
import * as actions from "@/redux/actions";
import {defaultStyles} from '@/constants';
import {parse} from "@core/parse";

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
    return createTable(this.count, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$onSubscribe('formula:input', (value) => {
      this.selection.current.attr('data-value', value)
        .text(parse(value))

      this.updateTextInStore(value)
    })
    this.$onSubscribe('formula:enter', () => {
      this.selection.current.focus()
    })
    this.$onSubscribe('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })

  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyle(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
    //console.log('CURRENT CELL STYLES', styles)
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize Error', e)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target,this.selection.current).map(id=>this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
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
     // console.log('Shift Pressed')
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.dataId(),
      value
    }))
  }

  onInput(event){
    this.updateTextInStore($(event.target).text())
  }

}


