class Watcher {
  constructor (vm, expOrFn, cb) {
    this.vm = vm
    this.getter = parsePath(expOrFn) // 执行 this.getter 可以读取到 data 中的值
    this.cb = cb
    this.value = this.get()
  }

  get () {
    dataConsumer = this
    let value = this.getter.call(this.vm, this.vm) // 触发依赖收集
    dataConsumer = undefined
    return value
  }

  update () {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}

const bailRE = /[^\w.$]/
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}