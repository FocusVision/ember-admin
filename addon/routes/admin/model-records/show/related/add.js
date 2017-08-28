import Ember from 'ember'
import RelationshipRouteMixin
  from 'ember-admin/mixins/model-records/relationship-route-mixin'

const {
  Route,
  inject: { service }
} = Ember

export default Route.extend(RelationshipRouteMixin, {
  admin: service(),

  model(params) {
    return this
      .get('admin.store')
      .query(
        this.modelFor('admin.model-records.show.related').relatedModelType,
        params
      )
  }
})
