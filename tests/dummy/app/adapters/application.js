import Ember from 'ember'
import DS from 'ember-data'
import HasManyQuery from 'ember-data-has-many-query'

const {
  JSONAPIAdapter
} = DS
const {
  RESTAdapterMixin
} = HasManyQuery

export default JSONAPIAdapter.extend(RESTAdapterMixin, {
  coalesceFindRequests: true,
  pathForType(type) {
    return Ember.String.pluralize(type)
  }
})
