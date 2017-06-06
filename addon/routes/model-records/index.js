import Ember from 'ember'

const {
  get,
  Route,
  String: { singularize }
} = Ember

export default Route.extend({
  model(params) {
    const modelName = singularize(this.paramsFor('model-records').name)
    return this.admin.store
      .findAll(modelName)
      .then(records => records.filter(item => !get(item, 'isNew')))
  }
})
