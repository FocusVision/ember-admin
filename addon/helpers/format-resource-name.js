import Ember from 'ember'

const {
  Helper,
  String: { pluralize, capitalize }
} = Ember

export function formatResourceName(params) {
  return pluralize(capitalize(params[0]))
}

export default Ember.Helper.helper(formatResourceName)
