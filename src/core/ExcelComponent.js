import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor(root, options = {}) {
    super(root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.store = options.store
    this.storeSub = null

    this.prepare()
  }

  // configure component before init
  prepare() {}

  // returns component layout
  toHTML() {
    return ''
  }

  // notify listeners about event
  $emit(event,...args) {
    this.emitter.emit(event,...args)
  }

  /// subscribe on event
  $onSubscribe(event,fn) {
    const unsub = this.emitter.subscribe(event,fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  // add DOM listeners
  init() {
    this.initDOMListeners()
  }

  // remove DOM listeners , delete component
  destroy() {
    this.removeDOMListeners()
    this.storeSub.unsubscribe()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
