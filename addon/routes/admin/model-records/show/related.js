
import Ember from 'ember'
import IndexRouteMixin
  from 'ember-admin/mixins/model-records/index-route-mixin'
import RelationshipRouteMixin
  from 'ember-admin/mixins/model-records/relationship-route-mixin'

const {
  Route
} = Ember

export default Route.extend(IndexRouteMixin, RelationshipRouteMixin, {
  model(params) {
    return this.modelFor('admin.model-records.show')
      .query(this._relationshipName(), this.extractQueryParams(params))
  }
})
