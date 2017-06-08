import Ember from 'ember'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend({
  model(params) {
    const modelName = singularize(this.paramsFor('model-records').name)
    return this.admin.store
      .find(modelName, params.id)
  }
})
