import warning from 'tiny-warning'
import {createRule} from 'jss'

// A symbol replacement.
let now = Date.now()
const fnValuesNs = `fnValues${now}`
const fnRuleNs = `fnStyle${++now}`

const functionPlugin = () => ({
  onCreateRule(name, decl, options) {
    if (typeof decl !== 'function') return null
    const rule = createRule(name, {}, options)
    rule[fnRuleNs] = decl
    return rule
  },

  onProcessStyle(style, rule) {
    // We need to extract function values from the declaration, so that we can keep core unaware of them.
    // We need to do that only once.
    // We don't need to extract functions on each style update, since this can happen only once.
    // We don't support function values inside of function rules.
    if (fnValuesNs in rule || fnRuleNs in rule) return style

    const fnValues = {}
    for (const prop in style) {
      const value = style[prop]
      if (typeof value !== 'function') continue
      delete style[prop]
      fnValues[prop] = value
    }
    rule[fnValuesNs] = fnValues
    return style
  },

  onUpdate(data, rule, sheet, options) {
    const styleRule = rule

    const fnRule = styleRule[fnRuleNs]

    // If we have a style function, the entire rule is dynamic and style object
    // will be returned from that function.
    if (fnRule) {
      // Empty object will remove all currently defined props
      // in case function rule returns a falsy value.
      styleRule.style = fnRule(data) || {}

      if (process.env.NODE_ENV === 'development') {
        for (const prop in styleRule.style) {
          if (typeof styleRule.style[prop] === 'function') {
            warning(false, '[JSS] Function values inside function rules are not supported.')
            break
          }
        }
      }
    }

    const fnValues = styleRule[fnValuesNs]

    // If we have a fn values map, it is a rule with function values.
    if (fnValues) {
      for (const prop in fnValues) {
        styleRule.prop(prop, fnValues[prop](data), options)
      }
    }
  }
})

export default functionPlugin
