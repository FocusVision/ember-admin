import Ember from 'ember'
import ResourceRouteMixin
  from 'ember-admin/mixins/model-records/resource-route-mixin'

const {
  Route,
  String: { singularize },
  get
} = Ember

export default Route.extend(ResourceRouteMixin, {
  model(params) {
    const modelName = this._modelName()

    return this.get('admin.store').find(modelName, params.id)
  },

  afterModel(model) {
    this.set('breadCrumb', {
      title: get(model, 'id') || 'Edit',
      linkable: false
    })
  },

  setupController(controller, model) {
    this._super(controller, model)

    controller.set('recordType', this._modelName())
  },

  _modelName() {
    return singularize(this.paramsFor('admin.model-records').name)
  }
})
