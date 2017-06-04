import Ember from 'ember'

const {
  get,
  Route
} = Ember

export default Route.extend({
  model() {
    return this.admin.store
      .findAll(this.paramsFor('model-records').name)
      .then(records => records.filter(item => !get(item, 'isNew')))
  }
})
