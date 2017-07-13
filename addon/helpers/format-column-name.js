import Ember from 'ember'

const {
  String: { decamelize, capitalize },
  Helper
} = Ember


export function formatColumnName([camelizedKey]) {
  return capitalize(decamelize(camelizedKey).replace(/_/g, ' '))
}

export default Helper.helper(formatColumnName)
