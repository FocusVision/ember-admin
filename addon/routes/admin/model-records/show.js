import Ember from 'ember'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend({
  model(params) {
    const modelName = singularize(this.paramsFor('admin.model-records').name)
    return this.get('admin.store').find(modelName, params.id)
  }
})
