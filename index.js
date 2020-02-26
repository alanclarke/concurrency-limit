const promisify = (fn) => (...args) => new Promise(resolve => resolve(fn(...args)))
const inputError = new Error('limit-concurrency expects an integer greater than zero')

module.exports = function limitConcurrency (fn, n = 1) {
  if ((typeof n !== 'number') || isNaN(n) || n < 1) throw inputError

  let active = 0
  const queue = []

  return (...args) => new Promise((resolve, reject) => {
    queue.push(() => promisify(fn)(...args).then(resolve, reject))
    run()
  })

  function run () {
    if (queue.length && active < n) {
      active++
      const task = queue.shift()
      return task().then(() => {
        active--
        run()
      })
    }
  }
}
