import Ember from 'ember'
import ResourceListRouteMixin
  from 'ember-admin/mixins/model-records/resource-list-route'

const {
  Route
} = Ember

export default Route.extend(ResourceListRouteMixin, {
  model(params) {
    return this
      .modelFor('model-records.show')
      .query(params.relationship_name, this.extractQueryParams(params))
  }
})
