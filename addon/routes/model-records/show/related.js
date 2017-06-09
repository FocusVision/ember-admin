import Ember from 'ember'
import IndexRouteMixin
  from 'ember-admin/mixins/model-records/index-route-mixin'

const {
  Route
} = Ember

export default Route.extend(IndexRouteMixin, {
  model(params) {
    return this
      .modelFor('model-records.show')
      .query(params.relationship_name, params)
  }
})
