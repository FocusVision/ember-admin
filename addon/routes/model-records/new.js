import Ember from 'ember'
import ResourceRouteMixin
  from 'ember-admin/mixins/model-records/resource-route-mixin'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(ResourceRouteMixin, {
  templateAdminPath: 'admin/new',
  model() {
    return this.admin.store.createRecord(
      singularize(this.paramsFor('model-records').name)
    )
  }
})
