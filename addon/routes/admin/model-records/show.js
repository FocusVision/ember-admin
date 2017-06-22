import Ember from 'ember'
import ResourceRouteMixin
  from 'ember-admin/mixins/model-records/resource-route-mixin'

const {
  Route,
  String: { singularize }
} = Ember

export default Route.extend(ResourceRouteMixin, {
  model(params) {
    const modelName = singularize(
      this.paramsFor('admin.model-records').name
    )
    return this.get('admin.store').find(modelName, params.id)
  },

  setupController(controller, model) {
    this._super(controller, model)

    controller.set('recordType', this._modelName())
  },

  _modelName() {
    return singularize(this.paramsFor('admin.model-records').name)
  }
})
