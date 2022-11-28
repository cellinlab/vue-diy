
/**
 * 对 Object.defineProperty 的封装
 * @param {*} data 
 * @param {*} key 
 * @param {*} val 
 */
function defineReactive (data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('get value')
      return val
    },
    set: function (newVal) {
      console.log('change value')
      if (newVal === val) {
        return
      }
      val = newVal
    }
  })
}

const a = { name: 'default' }

defineReactive(a, 'name', a.name)

console.log(a.name) // get value
// default

a.name = 'new name' // change value
console.log(a.name) // get value 
// new name

a.name = 'other name' // change value
console.log(a.name) // get value
// other name