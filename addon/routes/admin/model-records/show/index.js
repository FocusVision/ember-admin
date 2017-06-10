import Ember from 'ember'
import ResourceRouteMixin
  from 'ember-admin/mixins/model-records/resource-route-mixin'

const {
  Route,
  String: { singularize },
} = Ember

export default Route.extend(ResourceRouteMixin, {
  templateAdminPath: 'admin/model-records/show/',
  model(params) {
    const modelName = singularize(this.paramsFor('admin.model-records').name)

    return this.get('admin.store').find(modelName, params.id)
  }
})
