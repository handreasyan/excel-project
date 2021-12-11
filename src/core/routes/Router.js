import {$} from "@core/DOM";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Router {
  constructor(selector,routes) {
    if(!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()

  }

  changePageHandler() {
    if(this.page){
      this.page.destroy()
    }
    this.$placeholder.clear()

    const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard

    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }

  init() {
    this.changePageHandler()
    window.addEventListener('hashchange',this.changePageHandler)
  }

  destroy() {
    window.removeEventListener('hashchange',this.changePageHandler)
  }

}