import warning from 'tiny-warning'
import RuleList from '../RuleList'
import escape from '../utils/escape'
import getWhitespaceSymbols from '../utils/getWhitespaceSymbols'

const defaultToStringOptions = {
  indent: 1,
  children: true
}

const nameRegExp = /@keyframes\s+([\w-]+)/

/**
 * Rule for @keyframes
 */
export class KeyframesRule {
  type = 'keyframes'

  at = '@keyframes'

  isProcessed = false

  constructor(key, frames, options) {
    const nameMatch = key.match(nameRegExp)
    if (nameMatch && nameMatch[1]) {
      this.name = nameMatch[1]
    } else {
      this.name = 'noname'
      warning(false, `[JSS] Bad keyframes name ${key}`)
    }
    this.key = `${this.type}-${this.name}`
    this.options = options
    const {scoped, sheet, generateId} = options
    this.id = scoped === false ? this.name : escape(generateId(this, sheet))
    this.rules = new RuleList({...options, parent: this})

    for (const name in frames) {
      this.rules.add(name, frames[name], {
        ...options,
        parent: this
      })
    }

    this.rules.process()
  }

  /**
   * Generates a CSS string.
   */
  toString(options = defaultToStringOptions) {
    const {linebreak} = getWhitespaceSymbols(options)
    if (options.indent == null) options.indent = defaultToStringOptions.indent
    if (options.children == null) options.children = defaultToStringOptions.children
    if (options.children === false) {
      return `${this.at} ${this.id} {}`
    }
    let children = this.rules.toString(options)
    if (children) children = `${linebreak}${children}${linebreak}`
    return `${this.at} ${this.id} {${children}}`
  }
}

const keyRegExp = /@keyframes\s+/

const refRegExp = /\$([\w-]+)/g

const findReferencedKeyframe = (val, keyframes) => {
  if (typeof val === 'string') {
    return val.replace(refRegExp, (match, name) => {
      if (name in keyframes) {
        return keyframes[name]
      }

      warning(false, `[JSS] Referenced keyframes rule "${name}" is not defined.`)

      return match
    })
  }

  return val
}

/**
 * Replace the reference for a animation name.
 */
const replaceRef = (style, prop, keyframes) => {
  const value = style[prop]
  const refKeyframe = findReferencedKeyframe(value, keyframes)

  if (refKeyframe !== value) {
    style[prop] = refKeyframe
  }
}

export default {
  onCreateRule(key, frames, options) {
    return typeof key === 'string' && keyRegExp.test(key)
      ? new KeyframesRule(key, frames, options)
      : null
  },

  // Animation name ref replacer.
  onProcessStyle: (style, rule, sheet) => {
    if (rule.type !== 'style' || !sheet) return style

    if ('animation-name' in style) replaceRef(style, 'animation-name', sheet.keyframes)
    if ('animation' in style) replaceRef(style, 'animation', sheet.keyframes)
    return style
  },

  onChangeValue(val, prop, rule) {
    const {sheet} = rule.options

    if (!sheet) {
      return val
    }

    switch (prop) {
      case 'animation':
        return findReferencedKeyframe(val, sheet.keyframes)
      case 'animation-name':
        return findReferencedKeyframe(val, sheet.keyframes)
      default:
        return val
    }
  }
}
