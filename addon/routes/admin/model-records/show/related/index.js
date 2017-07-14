import Ember from 'ember'
import IndexRouteMixin
  from 'ember-admin/mixins/model-records/index-route-mixin'
import RelationshipRouteMixin
  from 'ember-admin/mixins/model-records/relationship-route-mixin'

const {
  Route,
  get,
  RSVP
} = Ember

export default Route.extend(IndexRouteMixin, RelationshipRouteMixin, {

  model(params) {
    const parentModelFor = this.modelFor('admin.model-records.show')
    const parentModelId = get(parentModelFor, 'id')
    const parentModelType = get(parentModelFor, 'constructor.modelName')
    const parentModel = this.get('admin.store')
      .peekRecord(parentModelType, parentModelId)

    return RSVP.hash({
      parentModel,
      relatedModel: parentModel.query(
        this._relationshipName(), this.extractQueryParams(params)
      )
    })
  }
})
