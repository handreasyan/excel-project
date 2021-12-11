import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/DOM';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root,options) {
    super($root, {
      name: 'Header',
      listeners: ['input','click'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" value="${title}" class="input"/>
      <div>
        <div class="button"><i class="material-icons" data-button="remove">delete</i></div>
        <div class="button"><i class="material-icons" data-button="exit">exit_to_app</i></div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)

    if($target.data.button === 'remove') {
      const decision = confirm('Are You want to delete this Table ?')

      if(decision) {
        localStorage.removeItem('excel:'+ActiveRoute.param)
        ActiveRoute.navigate('')
      }

    } else if( $target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
