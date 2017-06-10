import Ember from 'ember'
import ResourceListRouteMixin
  from 'ember-admin/mixins/model-records/resource-list-route'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(ResourceListRouteMixin, {
  model(params) {
    const modelName = singularize(this.paramsFor('admin.model-records').name)
    return this.get('admin.store').query(
      modelName,
      this.extractQueryParams(params)
    )
  }
})
