import Ember from 'ember'
import ResourceRouteMixin
  from 'ember-admin/mixins/model-records/resource-route-mixin'

const {
  Route,
  get,
  inject: { service }
} = Ember

export default Route.extend(ResourceRouteMixin, {
  admin: service(),

  model(params) {
    const parentModel = this.modelFor('admin.model-records.show')
    const parentType = this.get('admin.recordType')
    const relationshipType = this.get('admin.relationshipType')

    return this.get('admin.store').createRecord(relationshipType, {
        [parentType]: parentModel
      })
  }
})
