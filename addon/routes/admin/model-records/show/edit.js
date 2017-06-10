import Ember from 'ember'
import ResourceRouteMixin
  from 'ember-admin/mixins/model-records/resource-route-mixin'

const {
  Route
} = Ember

export default Route.extend(ResourceRouteMixin, {
  model() {
    return this.modelFor('admin.model-records.show')
  },
  templateAdminPath: 'admin/edit'
})
