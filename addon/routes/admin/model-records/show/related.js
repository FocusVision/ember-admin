import Ember from 'ember'
import RelationshipRouteMixin
  from 'ember-admin/mixins/model-records/relationship-route-mixin'

const {
  Route,
  get,
  inject: { service },
  RSVP
} = Ember

export default Route.extend(RelationshipRouteMixin, {
  admin: service(),

  model(params) {
    const parentModelFor = this.modelFor('admin.model-records.show')
    const parentModelId = get(parentModelFor, 'id')
    const parentModelType = get(parentModelFor, 'constructor.modelName')
    const parentModel = this.get('admin.store')
      .peekRecord(parentModelType, parentModelId)

    return RSVP.hash({
      parentModel,
      relatedModel: parentModel.get(get(params, 'relationship_name'))
    })
  }
})
