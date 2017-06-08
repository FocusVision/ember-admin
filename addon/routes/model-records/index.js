import Ember from 'ember'
import PaginatedRouteMixin
  from 'ember-admin/mixins/model-records/paginated-route'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(PaginatedRouteMixin, {
  model(params) {
    const modelName = singularize(this.paramsFor('model-records').name)
    return this.admin.store
      .query(modelName, params)
  }
})
