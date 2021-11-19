export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // notify listeners
  emit(event, ...args) {
    if(!Array.isArray(this.listeners[event])){
      return false
    }

    this.listeners[event].forEach(listener=>listener(...args))
  }

  // subscribe on notifications , add new listener
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}


// Example

// const emitter = new Emitter()
//
// emitter.subscribe('srbazan',(data)=>{
//   console.log('Sub:',data)
// })
//
// emitter.emit('srbazan',23, 42)
