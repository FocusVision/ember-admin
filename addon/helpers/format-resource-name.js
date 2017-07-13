import Ember from 'ember'

const {
  Helper,
  String: { pluralize, capitalize }
} = Ember

export function formatResourceName([resourceName]) {
  return pluralize(capitalize(resourceName))
}

export default Helper.helper(formatResourceName)
