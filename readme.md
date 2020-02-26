[![Travis CI](https://travis-ci.org/alanclarke/concurrency-limit.svg?branch=master)](https://travis-ci.org/alanclarke/concurrency-limit)
[![dependencies Status](https://david-dm.org/alanclarke/concurrency-limit/status.svg)](https://david-dm.org/alanclarke/concurrency-limit)
[![Coverage Status](https://coveralls.io/repos/github/alanclarke/concurrency-limit/badge.svg?branch=master)](https://coveralls.io/github/alanclarke/concurrency-limit?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


# Concurrency limit

Applies a concurrency limit to your function

25 LOC, 100% test coverage


## Installation

`npm install concurrency-limit`

## Usage

```js
;(async () => {
  const concurrencyLimit = require('concurrency-limit')
  const limit = 2

  const limited = concurrencyLimit(fn, limit /* defauts to 1 */)

  // Will only call 2 at a time
  await Promise.all([
    limited(),
    limited(),
    limited(),
    limited()
  ])

  // Respects input arguments and return values
  console.log(await limited(1, 2, 3) === await fn(1, 2, 3)) // true
})()
```
