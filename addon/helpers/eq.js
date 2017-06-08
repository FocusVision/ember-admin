import Ember from 'ember'

const {
  Helper: { helper }
} = Ember

export function eq(params) {
  return params[0] === params[1]
}

export default helper(eq)
