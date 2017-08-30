import Ember from 'ember'
import RelationshipRouteMixin
  from 'ember-admin/mixins/model-records/relationship-route-mixin'

const {
  Route
} = Ember

export default Route.extend(RelationshipRouteMixin, {
  model(params) {
    return this
      .get('admin.store')
      .query(
        this.modelFor('admin.model-records.show.related').relatedModelType,
        params
      )
  }
})
