import Ember from 'ember'
import ResourceRouteMixin
  from 'ember-admin/mixins/model-records/resource-route-mixin'

const {
  Route,
  inject: { service },
  String: { singularize }
} = Ember

export default Route.extend(ResourceRouteMixin, {
  admin: service(),

  model() {
    return this.get('admin.store').createRecord(this._relationshipType())
  },

  setupController(controller, model) {
    this._super(controller, model)

    controller.setProperties({
      parentModel: this.modelFor('admin.model-records.show'),
      recordName: this.paramsFor('admin.model-records.show.related')
        .relationship_name,
      recordType: this._relationshipType()
    })
  },

  _relationshipName() {
    return this.paramsFor('admin.model-records.show.related').relationship_name
  },

  _relationshipType() {
    return singularize(this._relationshipName())
  }
})