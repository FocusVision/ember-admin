import Ember from 'ember'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend({
  queryParams: {
    filter: { refreshModel: true },
    page: { refreshModel: true }
  },
  model(params) {
    const modelName = singularize(this.paramsFor('model-records').name)
    return this.admin.store
      .query(modelName, params)
  }
})
