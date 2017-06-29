import Ember from 'ember'

const {
  Service,
  inject: { service },
  computed,
  String: { singularize }
} = Ember

export default Service.extend({
  routing: service('-routing'),

  includedModels: null,
  excludedModels: null,

  includedColumns: null,
  excludedColumns: null,

  namespace: 'admin'
})
