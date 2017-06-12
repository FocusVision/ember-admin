import Ember from 'ember'
import IndexRouteMixin
  from 'ember-admin/mixins/model-records/index-route-mixin'

const {
  Route,
  String: { singularize }
} = Ember



export default Route.extend(IndexRouteMixin, {
  model(params) {
    const modelName = singularize(this._relationshipName())

    return this.get('admin.store')
      .query(modelName, this.extractQueryParams(params))
  },

  setupController(controller, model) {
    this._super(controller, model)

    controller.set('recordType', singularize(this._relationshipName()))
  },

  _relationshipName() {
    return this.paramsFor('admin.model-records.show.related').relationship_name
  }
})
