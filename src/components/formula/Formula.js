import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from "../table/TableSelection";
import {$} from "../../core/DOM";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root,options) {
    super($root, {
      name: 'Formula',
      listeners: ['input','keydown'],
      ...options
    })
  }
  
  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula-input" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula-input')
    this.$onSubscribe('table:select', $cell => {
      this.$formula.text($cell.text())
    })
    this.$onSubscribe('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }
  
  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event){
    const keys = ['Enter', 'Tab']
    if(keys.includes(event.key)){
      event.preventDefault()
      this.$emit('formula:enter')
    }
  }

}
