import Ember from 'ember'
import ResourceListRouteMixin
  from 'ember-admin/mixins/model-records/index-route-mixin'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(ResourceListRouteMixin, {
  model(params) {
    return this.admin.store
      .query(modelName, params)
  }
})
