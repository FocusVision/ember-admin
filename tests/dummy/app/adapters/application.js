import Ember from 'ember'
import DS from 'ember-data'

const {
  JSONAPIAdapter
} = DS

export default JSONAPIAdapter.extend({
  pathForType(type) {
    return Ember.String.pluralize(type)
  }
})
