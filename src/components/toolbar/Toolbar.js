import {createToolbar} from './toolbar.template';
import {$} from '@core/DOM';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  // next lesson _ 06_19

  storeChanged(changes) {
    this.setState(changes.currentStyles)
    console.log('CHANGES', changes)
  }

  onClick(event) {
    const $target = $(event.target)
    if($target.data.type === 'button'){
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle',value)
    }
  }

}
