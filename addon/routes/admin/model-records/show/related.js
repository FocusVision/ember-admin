import Ember from 'ember'
import RelationshipRouteMixin
  from 'ember-admin/mixins/model-records/relationship-route-mixin'

const {
  Route,
  get,
  RSVP
} = Ember

export default Route.extend(RelationshipRouteMixin, {
  breadCrumb: null,

  model(params) {
    const store = this.get('admin.store')
    const parentModelFor = this.modelFor('admin.model-records.show')
    const parentModelId = get(parentModelFor, 'id')
    const relationshipName = get(params, 'relationship_name')
    const parentModelType = get(parentModelFor, 'constructor.modelName')
    const parentModel = store.peekRecord(parentModelType, parentModelId)
    const relatedModelType = store
      .modelFor(parentModelType)
      .typeForRelationship(relationshipName, store)
      .modelName

    return RSVP.hash({
      parentModel,
      relatedModel: parentModel.get(relationshipName),
      relatedModelType
    })
  }
})
