import Ember from 'ember'

const {
  Route,
  computed
} = Ember

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model)

    set(
      controller,
      'recordType',
      this.get('modelRecordNameFromParams')
    )
  },

  modelRecordNameFromParams: computed(function() {
    return singularize(this.paramsFor('model-records').name)
  }).volatile()
})
