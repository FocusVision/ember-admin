import Ember from 'ember'
import ResourceRouteMixin
  from 'ember-admin/mixins/model-records/resource-route-mixin'
import RelationshipRouteMixin
  from 'ember-admin/mixins/model-records/relationship-route-mixin'

const {
  Route
} = Ember

export default Route.extend(ResourceRouteMixin, RelationshipRouteMixin, {
  model() {
    return this.get('admin.store').createRecord(this._relationshipType())
  }
})
