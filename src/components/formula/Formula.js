import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/DOM';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root,options) {
    super($root, {
      name: 'Formula',
      listeners: ['input','keydown'],
      subscribe: ['currentText'],
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
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
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
