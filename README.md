# line-apply
A CLI tool to transform a text stream by applying a JS function to each line

Features:
* take the JS function to apply from a file
* the function may return async results
* preview the transformation results with the `--diff` option

[![NPM](https://nodei.co/npm/line-apply.png?stars&downloads&downloadRank)](https://npmjs.com/package/line-apply/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E=%20v7.6.0-brightgreen.svg)](http://nodejs.org)


## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [How To](#how-to)
  - [Basic](#basic)
  - [Async](#async)
  - [Diff mode](#diff-mode)
  - [Filter mode](#filter-mode)
  - [Use sub-function](#use-sub-function)
  - [Pass additional arguments](#pass-additional-arguments)
- [See also](#see-also)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Install
```sh
npm i -g line-apply
```

## How To

### Basic
```sh
cat some_data | line-apply some_transform_function.js > some_data_transformed
# Which can also be written
line-apply some_transform_function.js < cat some_data > some_data_transformed
```
where `some_transform_function.js` just needs to export a JS function. This should work both with the ESM export syntax
```js
// some_transform_function.js
export default function (line) {
  if (line.length > 10) {
    return line.toUpperCase()
  } else {
    // returning null or undefined drops the entry
  }
}
```
or with the CommonJS export syntax
```js
// some_transform_function.js
module.exports = function (line) {
  if (line.length > 10) {
    return line.toUpperCase()
  } else {
    // returning null or undefined drops the entry
  }
}
```

### Async
That function can also be async:
```js
import { getSomeExtraData } from './path/to/get_some_extra_data.js'

// some_async_transform_function.js
export default async function (doc) {
  if (line.length > 10) {
    const id = line.match(/(Q[\d+]) /)[1]
    const data = await getSomeExtraData(id)
    return `${line} ${data}`
  } else {
    // returning null or undefined drops the entry
  }
}
```

### Diff mode
As a way to preview the results of your transformation, you can use the diff mode
```sh
cat some_data | line-apply some_transform_function.js --diff
```
which will display a colored diff of each line before and after transformation.

### Filter mode
Use the js function only to filter lines: lines returning `true` will be let through. No transformation will be applied.
```sh
cat some_data | line-apply some_transform_function.js --filter
```

### Use sub-function
Given a `function_collection.js` file like:
```js
// function_collection.js
export function uppercase (line) {
  return line.toUpperCase()
}

export function lowercase (line) {
  return line.toLowerCase()
}
```

You can use those subfunction by passing their key as an additional argument
```sh
cat some_data | line-apply ./function_collection.js uppercase
cat some_data | line-apply ./function_collection.js lowercase
```

This should also work with the CommonJS syntax:
```js
// function_collection.cjs
module.exports = {
  uppercase: line => line.toUpperCase(),
  lowercase: line => line.toLowerCase(),
}
```

### Pass additional arguments
Any remaining argument will be passed to the function
```sh
# Pass '123' as argument to the exported function
cat some_data | line-apply ./function.js 123
# Pass '123' as argument to the exported sub-function foo
cat some_data | line-apply ./function_collection.js foo 123
```

## See also
* [ndjson-apply](https://github.com/maxlath/ndjson-apply/)
* [json-apply](https://github.com/maxlath/json-apply/)
