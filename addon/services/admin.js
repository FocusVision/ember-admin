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

  namespace: 'admin',

  /*
  * Convenience Properties
  * for params
  */
  currentParams: computed(function() {
    return this.get(
      'routing.router.router.state.params'
    )
  }).volatile(),

  recordType: computed(function() {
    const modelRecords = this.get('currentParams')['admin.model-records']

    return singularize(modelRecords.name)
  }).volatile(),

  recordId: computed(function() {
    return this.get('currentParams')['admin.model-records.show'].id
  }).volatile(),

  relationshipName: computed(function() {
    const related =
      this.get('currentParams')['admin.model-records.show.related']

    return related.relationship_name
  }).volatile(),

  relationshipType: computed(function() {
    return singularize(this.get('relationshipName'))
  }).volatile()
})
