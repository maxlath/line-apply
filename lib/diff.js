import { diffChars } from 'diff'
import { green, red, grey } from 'tiny-chalk'

export default (originalLine, transformedLine) => {
  if (!transformedLine) return grey(stringify(originalLine))

  let text = ''

  diffChars(originalLine, String(transformedLine))
  .forEach(part => {
    const { added, removed, value } = part
    if (added) text += green(value)
    else if (removed) text += red(value)
    else text += grey(value)
  })

  return text
}
