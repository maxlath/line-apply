import diff from './diff.js'

export default {
  sync: (transformFn, showDiff, filterOnly, additionalArgs) => function (line) {
    if (!line) return
    const transformedLine = transformFn(line, ...additionalArgs)
    if (filterOnly) {
      if (transformedLine === true) pushOutput.call(this, line, line)
    } else {
      pushOutput.call(this, line, transformedLine, showDiff)
    }
  },

  async: (transformFn, showDiff, filterOnly, additionalArgs) => async function (line) {
    if (!line) return
    // Pause and resume to keep lines in the same order as they arrived
    this.pause()
    const transformedLine = await transformFn(line, ...additionalArgs)
    if (filterOnly) {
      if (transformedLine === true) pushOutput.call(this, line, line)
    } else {
      pushOutput.call(this, line, transformedLine, showDiff)
    }
    this.resume()
  },
}

const pushOutput = function (line, transformedLine, showDiff) {
  if (transformedLine == null) return
  let output
  if (showDiff) {
    output = diff(line, transformedLine)
  } else {
    output = transformedLine
  }
  this.queue(output + '\n')
}
