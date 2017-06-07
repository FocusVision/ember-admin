import Ember from 'ember'
import ResourceRouteMixin from 'ember-admin/mixins/model-records/resource-route-mixin'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(ResourceRouteMixin, {
  templateAdminPath: 'admin/edit',
  model(params) {
    const modelName = singularize(this.paramsFor('model-records').name)
    return this.admin.store
      .find(modelName, params.id)
  }
})
