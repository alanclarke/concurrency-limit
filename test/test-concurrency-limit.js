const test = require('ava')
const concurrencyLimit = require('../')
const inputErrorMessage = 'concurrency-limit expects an integer greater than zero'

;[undefined, 2, 3, 4, 5].forEach(limit => {
  test(`allows max concurrency of ${limit || 1}`, async t => {
    let active = 0
    const activeChecks = []
    const check = concurrencyLimit(async () => {
      active++
      await new Promise(resolve => setTimeout(resolve, 1))
      activeChecks.push(active)
      active--
    }, limit)
    const batch = []
    let n = 100
    while (n--) batch.push(check)
    await Promise.all(batch.map(check => check()))
    t.is(Math.max(...activeChecks), limit || 1)
  })
})

test('accepts and returns args', async t => {
  const stub = concurrencyLimit(args => args)
  const args = [1, 2, 3]
  t.is(await stub(args), args)
})

test('throws errors', async t => {
  const eek = new Error('eek')
  const stub = concurrencyLimit(() => {
    throw eek
  })
  return stub().catch(err => t.is(err, eek))
})

test('rejects n less than zero', async t => {
  t.throws(() => concurrencyLimit(() => {}, -1), {
    message: inputErrorMessage
  })
})

test('rejects non-integer n', async t => {
  t.throws(() => concurrencyLimit(() => {}, NaN), {
    message: inputErrorMessage
  })
})
